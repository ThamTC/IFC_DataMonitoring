const redis = require("redis");
const client = redis.createClient();
client.connect()
const db = require("../models/index");
const formatPayload = require("../utils/formatPayload");
const logger = require("../services/logger")("statistic", "db_error")

client.on("error", function (err) {
  console.log("Error " + err);
});
function handleTask(data, channel) {
  if (data.length > 10) {
    const resData = JSON.parse(data);
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset).toISOString()
    var itemsDelete = [];
    var itemsDeleteIdx = [];
    for (let idx = 0; idx < resData.length; idx++) {
      const timeOut =
        (new Date(localISOTime)).getTime() - (new Date(resData[idx].createAt)).getTime(); // milisecond
      if (
        !resData[idx].isAction && (resData[idx].action ?? "null").toLowerCase() != "null" &&
        (timeOut > (parseInt(resData[idx].timeout * 60000) ?? 60000 * process.env.REDIS_TIMEOUT) ||
          resData[idx].total >= (parseInt(resData[idx].count) ?? process.env.REDIS_COUNT_WARNING))
      ) {
        // write to DB
        const record = formatPayload.payloadNoCheck(resData[idx], localISOTime)
        itemsDelete.push(record);
        itemsDeleteIdx.push(idx);
        // StatisticModel.create(record);
      }
    }
    // delete item
    if (itemsDelete.length > 0) {
      db.GS_Statistic.bulkCreate(itemsDelete)
        .then(() => logger.log("info", "Insert DB thanh cong" + ", path:" + __filename + ", func: trackToTask"))
        .catch((error) => logger.log("error", "Co loi xay ra voi DB: " + error + ", path:" + __filename + ", func: trackToTask"))

      itemsDeleteIdx.forEach((ele) => {
        resData.splice(ele, 1);
      });
      client.set(channel, JSON.stringify(resData));
      global.io.sockets.emit(channel, resData);
    }
  }
}
const redisToken = {
  clearData: async (key) => {
    const resData = [];
    await client.set(key, JSON.stringify(resData));
  },
  updateData: async (key, value, newValue) => {
    const resData = await client.get(key);
    resData = JSON.parse(resData);
    for (let idx = 0; idx < resData.length; idx++) {
      if (resData[idx] === value) {
        resData[idx] = newValue;
        break;
      }
    }
    await client.set(key, resData);
  },
  storeToken: async (key, value) => {
    var resData = await client.get(key);
    resData = JSON.parse(resData);
    let isFoundValue = false;
    for (let idx = 0; idx < resData.length; idx++) {
      if (resData[idx] === value) {
        resData[idx] = value;
        isFoundValue = true;
        break;
      }
    }
    if (!isFoundValue) {
      resData.push(value);
    }
    await client.set(key, JSON.stringify(resData));
  },
  isExistToken: async (refreshToken) => {
    var resData = await client.get("refreshToken");
    resData = JSON.parse(resData);
    if (!resData.includes(refreshToken)) {
      return false;
    }
    const refreshTokenFilter = resData.filter(item => item !== refreshToken);
    await client.set("refreshToken", JSON.stringify(refreshTokenFilter))
    return true;
  },
  clearAccessToken: async (accessToken) => {
    var resData = await client.get("accessToken")
    resData = JSON.parse(resData)
    const accessTokenFilter = resData.filter(item => item !== accessToken);
    await client.set("accessToken", JSON.stringify(accessTokenFilter))
  },
  trackToTask: () => {
    setInterval(() => {
      client
        .get("statistic")
        .then(async (data) => {
          handleTask(data, "statistic")
          return client.get("solar_statistic")
        })
        .then(async (data) => {
          handleTask(data, "solar_statistic")
        })
        .catch((err) => console.log(err));
    }, 1000 * 60);
  },
};

module.exports = redisToken;

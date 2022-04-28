const redis = require("async-redis");
const client = redis.createClient();
const StatisticModel = require("../models/statistic");

client.on("error", function (err) {
  console.log("Error " + err);
});

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
    resData.filter((item) => item !== refreshToken);
    return true;
  },
  clearCacheInterval: () => {
    setInterval(async () => {
      const d = new Date();
      const hours = d.getHours();
      if (hours == process.env.REDIS_TIME_CLEAR) {
        await client.set("realtime", "[]");
        await client.set("statistic", "[]");
      }
    }, 1000 * 60 * 60);
  },
  trackToTask: () => {
    setInterval(() => {
      client
        .get("statistic")
        .then((data) => {
          const resData = JSON.parse(data);
          const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
          const localISOTime = new Date(Date.now()-tzoffset).toISOString()
          var itemsDelete = [];
          for (let idx = 0; idx < resData.length; idx++) {
            const timeOut =
              (new Date(localISOTime)).getTime() - (new Date(resData[idx].createAt)).getTime(); // milisecond
            if (
              !resData[idx].isAction && (resData[idx].action ?? "null").toLowerCase() != "null" && 
              (timeOut > (parseInt(resData[idx].timeout * 60000) ?? 60000 * process.env.REDIS_TIMEOUT) ||
                resData[idx].total >= (parseInt(resData[idx].count) ?? process.env.REDIS_COUNT_WARNING))
            ) {
              // write to DB
              const record = {
                type: resData[idx]?.type,
                system: resData[idx]?.system,
                parameter: resData[idx]?.parameter,
                action: resData[idx]?.action,
                total: resData[idx]?.total,
                usernameDone: resData[idx]?.username,
                createAt: resData[idx].createAt ?? localISOTime,
                updateAt: resData[idx].updateAt ?? localISOTime,
              };
              itemsDelete.push(idx);
              StatisticModel.create(record);
            }
          }

          // delete item
          if (itemsDelete.length > 0) {
            itemsDelete.forEach((element) => {
              resData.splice(element, 1);
            });
            client.set("statistic", JSON.stringify(resData));
            global.io.sockets.emit("statistic", resData);
          }
          // send to email, skype, telegram,...
        })
        .catch((err) => console.log(err));
    }, 1000 * 60);
  },
};

module.exports = redisToken;

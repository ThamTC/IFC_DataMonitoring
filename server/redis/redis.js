const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const StatisticModel = require("../models/statistic");

client.on("error", function (err) {
  console.log("Error " + err);
});

const redisToken = {
  setData: async (key, value) => {
    try {
      await client.set(key, JSON.stringify(value));
    } catch (error) {
      return error;
    }
  },
  getData: async (key) => {
    try {
      const resData = await client.get(key);
      if (resData !== "[]" || resData !== null) {
        resData = JSON.parse(resData);
      }
      return resData;
    } catch (error) {
      return error;
    }
  },
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
      console.log(hours);
      if (hours == process.env.REDIS_TIME_CLEAR) {
        await redisToken.clearData("realtime");
        await redisToken.clearData("statistic");
      }
    }, 1000 * 60 * 60);
  },
  trackToTask: () => {
    setInterval(() => {
      client
        .get("statistic")
        .then((data) => {
          const resData = JSON.parse(data);
          const d = new Date();
          var itemsDelete = [];
          for (let idx = 0; idx < resData.length; idx++) {
            const timeOut =
              Math.round(d.getTime() / 1000) - resData[idx].createAt;              
            if (
              !resData[idx].isAction &&
              (timeOut > 60 * process.env.REDIS_TIMEOUT ||
                resData[idx].count > process.env.REDIS_COUNT_WARNING)
            ) {
              // write to DB
              const record = {
                name: resData[idx]?.name ?? "",
                content: resData[idx]?.content ?? "",
                count: resData[idx]?.count ?? 0,
                contact: resData[idx]?.contact ?? "",
                firstTime: resData[idx]?.createAt ?? "",
                finalTime: resData[idx]?.updateAt ?? "",
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

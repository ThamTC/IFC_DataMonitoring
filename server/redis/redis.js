const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

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
  clearData: (key) => {
    const resData = [];
    redis_client.set(key, JSON.stringify(resData));
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
    setInterval(() => {
      const d = new Date(); 
      if (
        d.getHours() == process.env.REDIS_TIME_CLEAR &&
        d.getMinutes() == 0 
      ) {
        redisToken.clearData("realtime");
        redisToken.clearData("statistic");
      }
    }, 1000 * 60);
  },
};

module.exports = redisToken;

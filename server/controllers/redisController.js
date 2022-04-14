const DoneTask = require("../models/doneTask");
const DoneAllTask = require("../models/doneAllTask");
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
  throw err;
});

const redisController = {
  indexStore: async (req, res) => {
    var resData = [];
    const key = req.body.key;
    try {
      resData = await client.get(key);
      if (resData != null) {
        // chuyen string ve object
        resData = JSON.parse(resData);
      }
      return res.status(200).send(resData);
    } catch (error) {
      return error;
    }
  },
  updateStore: async (req, res) => {
    var resData = [];
    try {
      resData = await client.get("statistic");
      if (resData != null) {
        resData = JSON.parse(resData);
        for (let idx = 0; idx < resData.length; idx++) {
          if (req.body.id == idx) {
            resData[idx].isAction = req.body.isAction;
            resData[idx].username = req.body.username;
            break;
          }
        }
        await client.set("statistic", JSON.stringify(resData));
      }
      // global.io.sockets.emit("statistic", resData)
      return res.status(200).json(resData);
    } catch (error) {
      return error;
    }
  },
  deleteItem: async (req, res) => {
    var resData = [];
    try {
      resData = await client.get("statistic");
      if (resData != null) {
        // chuyen string ve object
        resData = JSON.parse(resData);
        for (let idx = 0; idx < resData.length; idx++) {
          if (req.body.id == idx) {
            const d = new Date();
            const doAlarm = {
              content: resData[idx].content,
              count: resData[idx].count,
              userCheck: req.body.userCheck,
              userDone: req.body.userDone,
              doneTime: d.toLocaleString(),
            };
            try {
              resData.splice(idx, 1);
            } catch (error) {
              throw error;
            }
            const isCreate = await DoneTask.create(doAlarm);
            if (!isCreate) {
              return res.status(401).json("Co loi trong qua trinh thao tac DB");
            }
            break;
          }
        }
        await client.set("statistic", JSON.stringify(resData));
      }
      // global.io.sockets.emit("statistic", resData)
      return res.status(200).json(resData);
    } catch (error) {
      return error;
    }
  },
  deleteStore: async (req, res) => {
    var resData = [];
    try {
      await client.set("statistic", JSON.stringify(resData));
      const d = new Date();
      const doAlarm = {
        userCheck: req.body.userCheck,
        userDone: req.body.userDone,
        doneTime: d.toLocaleString(),
      };
      const isCreate = await DoneAllTask.create(doAlarm);
      if (!isCreate) {
        return res.status(401).json("Co loi trong qua trinh thao tac DB");
      }
      return res.status(200).json(resData);
    } catch (error) {
      return error;
    }
  },
};

module.exports = redisController;

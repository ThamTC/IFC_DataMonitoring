const DoneTask = require("../models/doneTask");
const DoneTaskTest = require("../models/doneTaskTest");
const DoneAllTask = require("../models/doneAllTask");
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
  throw err;
});

const redisController = {
  hgetall: async (req, res) => {
    var resData = [];
    const key = req.body.key;
    try {
      resData = await client.hgetall(key);
      return res.status(200).send(resData);
    } catch (error) {
      return error;
    }
  },
  indexStore: (req, res) => {
    const key = req.body.key;
    try {
      client.get(key).then((data) => res.status(200).send(JSON.parse(data)));
    } catch (error) {
      return error;
    }
  },
  updateStore: (req, res) => {
    var resData = [];
    const key = req.body.key;
    try {
      client.get(key).then((data) => {
        resData = JSON.parse(data);
        for (let idx = 0; idx < resData.length; idx++) {
          if (req.body.id == idx) {
            resData[idx].isAction = req.body.isAction;
            resData[idx].username = req.body.username;
            break;
          }
        }
        client.set(key, JSON.stringify(resData));
        global.io.sockets.emit("test_statistic", resData);
        return res.status(200).json(resData);
      });
    } catch (error) {
      return error;
    }
  },
  deleteItem: async (req, res) => {
    var resData = [];
    const key = req.body.key;
    try {
      resData = await client.get(key);
      if (resData != null) {
        // chuyen string ve object
        resData = JSON.parse(resData);
        for (let idx = 0; idx < resData.length; idx++) {
          if (req.body.id == idx) {
            const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = new Date(Date.now() - tzoffset).toISOString();
            var doAlarm = {};
            if (key == "statistic") {
              doAlarm = {
                content: resData[idx].content,
                count: resData[idx].count,
                userCheck: req.body.userCheck,
                userDone: req.body.userDone,
                doneTime: localISOTime,
              };
            } else if (key == "test_statistic") {
              doAlarm = {
                type: resData[idx].type,
                system: resData[idx].system,
                parameter: resData[idx].parameter,
                total: resData[idx].total,
                priority: resData[idx].priority,
                userCheck: req.body?.userCheck,
                userDone: req.body?.userDone,
                doneTime: localISOTime,
                createAt: resData[idx].createAt,
                updateAt: resData[idx].updateAt,
              };
            }
            try {
              resData.splice(idx, 1);
            } catch (error) {
              throw error;
            }
            var isCreate;
            if (key == "statistic") {
              isCreate = await DoneTask.create(doAlarm);
            } else if (key == "test_statistic") {
              isCreate = await DoneTaskTest.create(doAlarm);
            }
            if (!isCreate) {
              return res.status(401).json("Co loi trong qua trinh thao tac DB");
            }
            break;
          }
        }
        await client.set(key, JSON.stringify(resData));
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
  deleteSelection: async (req, res) => {
    const key = req.body.key;
    const selection = req.body.selection;
    try {
      const data = await client.get(key);
      var resData = JSON.parse(data)
      const filter =
        selection == "checked" ? true : (selection == "unchecked" ? false : "checkedall");
      if (filter == "checkedall") {
        await client.set(key, JSON.stringify([]));
        resData = []
      }else {
        const itemFilters = resData.filter((ele) => ele.isAction == filter)
        itemFilters.forEach(() => {
          resData.splice(resData.findIndex((ele) => ele.isAction == filter), 1)
        });
        await client.set(key, JSON.stringify(resData));
      }
      const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const localISOTime = new Date(Date.now() - tzoffset).toISOString();
      const doAlarm = {
        tasks: resData,
        userCheck: req.body.userCheck,
        userDone: req.body.userDone,
        doneTime: localISOTime,
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

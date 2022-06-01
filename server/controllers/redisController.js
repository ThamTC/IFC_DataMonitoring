
const asyncRedis = require("redis");
const client = asyncRedis.createClient();
client.connect()
const db = require("../models/index")
const logger = require("../services/logger")("statistic", "db_error")

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
      client.get(key)
      .then((data) => {
        return res.status(200).send(JSON.parse(data))
      });
    } catch (error) {
      return res.status(400).json(error);
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
        global.io.sockets.emit(key, resData);
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
            
            const doAlarm = {
              type: resData[idx].type,
              system: resData[idx].system,
              parameter: resData[idx].parameter,
              status: resData[idx].status,
              total: resData[idx].total,
              priority: resData[idx].priority,
              userCheck: req.body?.userCheck,
              userDone: req.body?.userDone,
              doneTime: localISOTime,
              createAt: resData[idx].createAt,
              updateAt: resData[idx].updateAt,
            };
            try {
              resData.splice(idx, 1);
            } catch (error) {
              throw error;
            }
            if (key == "statistic") {
              db.GS_Statistic.create(doAlarm)
              .then(() => logger.log("info", "Insert DB thanh cong"))
              .catch((error) => logger.log("error", "Co loi trong qua trinh thao tac DB: " + error))
              // isCreate = await DoneTask.create(doAlarm);
            }
            break;
          }
        }
        await client.set(key, JSON.stringify(resData));
      }
      // global.io.sockets.emit("statistic", resData)
      return res.status(200).json(resData);
    } catch (error) {
      logger.log("error", "Co loi: " + error)
      return error;
    }
  },
  // deleteSelection: async (req, res) => {
  //   const key = req.body.key;
  //   const selection = req.body.selection;
  //   try {
  //     const data = await client.get(key);
  //     var resData = JSON.parse(data);
  //     const filter =
  //       selection == "checked"
  //         ? true
  //         : selection == "unchecked"
  //         ? false
  //         : "checkedall";
  //     var dataTasks = []
  //     if (filter == "checkedall") {
  //       await client.set(key, JSON.stringify([]));
  //       resData = [];
  //       dataTasks = resData
  //     } else {
  //       const itemFilters = resData.filter((ele) => ele.isAction == filter);
  //       dataTasks = itemFilters
  //       itemFilters.forEach(() => {
  //         resData.splice(
  //           resData.findIndex((ele) => ele.isAction == filter),
  //           1
  //         );
  //       });
  //       await client.set(key, JSON.stringify(resData));
  //     }
  //     const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //     const localISOTime = new Date(Date.now() - tzoffset).toISOString();
  //     const doAlarm = {
  //       tasks: dataTasks,
  //       userCheck: req.body.userCheck,
  //       userDone: req.body.userDone,
  //       doneTime: localISOTime,
  //     };
  //     const isCreate = await DoneAllTask.create(doAlarm);
  //     if (!isCreate) {
  //       return res.status(401).json("Co loi trong qua trinh thao tac DB");
  //     }
  //     return res.status(200).json(resData);
  //   } catch (error) {
  //     return error;
  //   }
  // },
  // deleteTaskHour: async(req, res) => {
  //   const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //   const localTime = new Date(Date.now() - tzoffset).getTime();
  //   try {
  //     const hour = req.body.hour
  //     const userDone = req.body.userDone
  //     const currentTime = localTime - (hour * 60 * 60 * 1000)
  //     const data = await client.get("realtime")
  //     var resData = JSON.parse(data)
  //     const dataFilter = resData.filter((ele) => {
  //       const timeEle = (new Date(ele.time)).getTime()
  //       return timeEle < currentTime
  //     })
  //     dataFilter.forEach((f) => {
  //       resData.splice(resData.findIndex((ele) => ele.time == f.time), 1)
  //     })
  //     // save to redis
  //     await client.set("realtime", JSON.stringify(resData))
  //     // emit to other clients
  //     global.io.sockets.emit("deleteRealtime", resData)
  //     return res.status(200).json(resData)
  //   } catch (error) {
  //     return error;
  //   }
  // }
};

module.exports = redisController;

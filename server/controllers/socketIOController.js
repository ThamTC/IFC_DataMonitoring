const asyncRedis = require("redis");
const client = asyncRedis.createClient();
client.connect()
const db = require("../models/index");
const formatPayload = require("../utils/formatPayload");
const logger = require("../services/logger")("statistic", "db_error")

client.on("error", function (err) {
    throw err;
});

const socketIO = {
    deleteRealtime: async (data) => {
        const deleteChannel = data.deleteChannel
        const updateChannel = data.updateChannel
        const hour = data.hour
        const userDone = data.username
        const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        const localTime = new Date(Date.now() - tzoffset).getTime();
        try {
            const currentTime = localTime - (hour * 60 * 60 * 1000)
            const data = await client.get(deleteChannel)
            var resData = JSON.parse(data)
            const dataFilter = resData.filter((ele) => {
                const timeEle = (new Date(ele.time)).getTime()
                return timeEle < currentTime
            })
            dataFilter.forEach((f) => {
                resData.splice(resData.findIndex((ele) => ele.time == f.time), 1)
            })
            // save to redis                                                                                                                                
            await client.set(deleteChannel, JSON.stringify(resData))
            // emit to other clients
            global.io.sockets.emit(updateChannel, { error: null, data: resData })
        } catch (error) {
            global.io.sockets.emit(updateChannel, { error: error, data: [] })
        }
    },
    doneSelectionTask: async (data) => {
        const userCheck = data.userCheck;
        const userDone = data.userCheck;
        const selection = data.selection;
        const key = data.key
        try {
            const data = await client.get(key);
            var resData = JSON.parse(data);
            const filter =
                selection == "checked"
                    ? true
                    : selection == "unchecked"
                        ? false
                        : "checkedall";
            var dataTasks = []
            if (filter == "checkedall") {
                await client.set(key, JSON.stringify([]));
                resData = [];
                dataTasks = resData
            } else {
                const itemFilters = resData.filter((ele) => ele.isAction == filter);
                dataTasks = itemFilters
                itemFilters.forEach(() => {
                    resData.splice(
                        resData.findIndex((ele) => ele.isAction == filter),
                        1
                    );
                });
                await client.set(key, JSON.stringify(resData));
            }
            const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = new Date(Date.now() - tzoffset).toISOString();
            const doAlarm = dataTasks.map((ele) => {
                return {
                    type: ele?.type ?? "test",
                    system: ele?.system ?? "test",
                    parameter: ele?.parameter ?? "test",
                    status: ele?.status ?? "Null",
                    total: ele?.total ?? "1",
                    priority: ele?.priority ?? "0",
                    userCheck: userCheck ?? "",
                    userDone: userDone ?? "",
                    doneTime: localISOTime,
                    createAt: ele?.createAt ?? localISOTime,
                    updateAt: ele?.updateAt ?? localISOTime,
                }
            })
            db.GS_Statistic.bulkCreate(doAlarm)
                .then(() => logger.log("info", "Insert DB thanh cong"))
                .catch((error) => {
                    logger.log("error", "Co loi trong qua trinh thao tac DB: " + error)
                    global.io.sockets.emit("updateStatistic", { error: "Co loi trong qua trinh thao tac DB", data: [] })
                })
            global.io.sockets.emit("updateStatistic", { error: null, data: resData })
        } catch (error) {
            logger.log("error", "Co loi xay ra: " + error + ", path:" + __filename + ", func: doneSelectionTask")
            global.io.sockets.emit("updateStatistic", { error: error, data: [] })
        }
    },
    doneTask: async (data) => {
        var resData = [];
        const userCheck = data.checkerName
        const userDone = data.doneName
        const id = data.id
        const key = data.key
        var contentStatistic;
        var realtimeKey
        var updateRealtimeKey
        var updateStatisticKey
        if (key == "statistic") {
            realtimeKey = "realtime"
            updateRealtimeKey = "updateRealtime"
            updateStatisticKey = "updateStatistic"
        } else {
            realtimeKey = "solar_realtime"
            updateRealtimeKey = "updateRealtimeSolar"
            updateStatisticKey = "updateStatisticSolar"
        }
        try {
            resData = await client.get(key);
            if (resData != null) {
                // chuyen string ve object
                resData = JSON.parse(resData);
                for (let idx = 0; idx < resData.length; idx++) {
                    if (id == idx) {
                        const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
                        const localISOTime = new Date(Date.now() - tzoffset).toISOString();
                        resData[idx].userCheck = userCheck
                        resData[idx].userDone = userDone
                        const doAlarm = formatPayload.doneTaskPayload(resData, localISOTime)
                        contentStatistic = resData[idx].type + resData[idx].system + resData[idx].parameter
                        try {
                            resData.splice(idx, 1);
                        } catch (error) {
                            global.io.sockets.emit(updateStatisticKey, { error: error, data: [] })
                        }
                        db.GS_Statistic.bulkCreate([doAlarm])
                            .then((data) => logger.log("info", "Insert DB thanh cong: " + data))
                            .catch((error) => {
                                logger.log("error", "Co loi trong qua trinh thao tac DB: " + error + ", path:" + __filename + ", func: doneTask")
                                global.io.sockets.emit(updateStatisticKey, { error: "Co loi trong qua trinh thao tac DB", data: [] })
                            })
                        break;
                    }
                }
                await client.set(key, JSON.stringify(resData));
            }
            global.io.sockets.emit(updateStatisticKey, { error: null, data: resData })
            resData = await client.get(realtimeKey);
            if (resData != null) {
                // chuyen string ve object
                resData = JSON.parse(resData);
                resData = resData.filter((value, idx) => {
                    const contentRealtime = value.type + value.system + value.parameter
                    return contentStatistic !== contentRealtime
                })
            }
            await client.set(realtimeKey, JSON.stringify(resData))
            global.io.sockets.emit(updateRealtimeKey, { error: null, data: resData })
        } catch (error) {
            logger.log("error", "Co loi xay ra: " + error + ", path:" + __filename + ", func: doneTask")
            global.io.sockets.emit(updateStatisticKey, { error: error, data: [] })
        }
    }
}
module.exports = socketIO
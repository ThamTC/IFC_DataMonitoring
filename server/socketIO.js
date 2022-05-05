const DoneAllTask = require("./models/doneAllTask")
const DoneTask = require("./models/doneTask")
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
    throw err;
});

const socketIO = {
    deleteRealtime: async (data) => {
        const hour = data.hour
        const userDone = data.username
        const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        const localTime = new Date(Date.now() - tzoffset).getTime();
        try {
            const currentTime = localTime - (hour * 60 * 60 * 1000)
            const data = await client.get("realtime")
            var resData = JSON.parse(data)
            const dataFilter = resData.filter((ele) => {
                const timeEle = (new Date(ele.time)).getTime()
                return timeEle < currentTime
            })
            dataFilter.forEach((f) => {
                resData.splice(resData.findIndex((ele) => ele.time == f.time), 1)
            })
            // save to redis                                                                                                                                
            await client.set("realtime", JSON.stringify(resData))
            // emit to other clients
            global.io.sockets.emit("updateRealtime", { error: null, data: resData })
        } catch (error) {
            global.io.sockets.emit("updateRealtime", { error: error, data: [] })
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
            const doAlarm = {
                tasks: dataTasks,
                userCheck: userCheck,
                userDone: userDone,
                doneTime: localISOTime,
            };
            const isCreate = await DoneAllTask.create(doAlarm);
            if (!isCreate) {
                global.io.sockets.emit("updateStatistic", { error: "Co loi trong qua trinh thao tac DB", data: [] })
            }
            global.io.sockets.emit("updateStatistic", { error: null, data: resData })
        } catch (error) {
            global.io.sockets.emit("updateStatistic", { error: error, data: [] })
        }
    },
    doneTask: async(data) => {
        var resData = [];
        const userCheck = data.checkerName
        const userDone = data.doneName
        const id = data.id
        const key = data.key
        var contentStatistic;
        try {
            resData = await client.get(key);
            if (resData != null) {
                // chuyen string ve object
                resData = JSON.parse(resData);
                for (let idx = 0; idx < resData.length; idx++) {
                    if (id == idx) {
                        const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
                        const localISOTime = new Date(Date.now() - tzoffset).toISOString();

                        const doAlarm = {
                            type: resData[idx].type,
                            system: resData[idx].system,
                            parameter: resData[idx].parameter,
                            total: resData[idx].total,
                            priority: resData[idx].priority,
                            userCheck: userCheck,
                            userDone: userDone,
                            doneTime: localISOTime,
                            createAt: resData[idx].createAt,
                            updateAt: resData[idx].updateAt,
                        };
                        contentStatistic = resData[idx].type + resData[idx].system + resData[idx].parameter
                        try {
                            resData.splice(idx, 1);
                        } catch (error) {
                            global.io.sockets.emit("updateStatistic", { error: error, data: [] })
                        }
                        const isCreate = await DoneTask.create(doAlarm);
                        if (!isCreate) {
                            global.io.sockets.emit("updateStatistic", { error: "Co loi trong qua trinh thao tac DB", data: [] })
                        }
                        break;
                    }
                }
                await client.set(key, JSON.stringify(resData));
            }
            global.io.sockets.emit("updateStatistic", { error: null, data: resData })
            resData = await client.get("realtime");
            if (resData != null) {
                // chuyen string ve object
                resData = JSON.parse(resData);
                resData = resData.filter((value, idx) => {
                    const contentRealtime = value.type + value.system + value.parameter
                    return contentStatistic !== contentRealtime
                })
            }
            await client.set("realtime", JSON.stringify(resData))
            global.io.sockets.emit("updateRealtime", { error: null, data: resData })
        } catch (error) {
            global.io.sockets.emit("updateStatistic", { error: error, data: [] })
        }
    }
}
module.exports = socketIO
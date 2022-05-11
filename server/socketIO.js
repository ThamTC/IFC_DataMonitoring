
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const db = require("./models/index")
const logger = require("./services/logger")("statistic", "db_error")

client.on("error", function (err) {
    throw err;
});
var users = []
const socket = (io) => {
    io.on("connection", function(socket) {
        socket.on("disconnect", function(data) {
            console.log(users[socket.id] + " da ngat ket noi")
            delete users[socket.id];
        })
        socket.on("deleteRealtime", socketIO.deleteRealtime)
        socket.on("doneSelectionTask", socketIO.doneSelectionTask)
        socket.on("doneTask", socketIO.doneTask)
        socket.on("login", function (data) {
            socket.emit("usersLogin", users)
            users[socket.id] = data.username;
            console.log(data.username + " da ket noi")
        })
    })
}
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
            logger.log("error", "Co loi xay ra: " + error)
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
                            value: resData[idx].value,
                            unit: resData[idx].unit,
                            contact: resData[idx].contact,
                            status: resData[idx].status,
                            total: resData[idx].total,
                            priority: resData[idx].priority,
                            userCheck: userCheck,
                            userDone: userDone,
                            doneTime: localISOTime,
                            createdAt: resData[idx].createAt ?? localISOTime,
                            updatedAt: resData[idx].updateAt ?? localISOTime,
                        };
                        contentStatistic = resData[idx].type + resData[idx].system + resData[idx].parameter
                        try {
                            resData.splice(idx, 1);
                        } catch (error) {
                            global.io.sockets.emit("updateStatistic", { error: error, data: [] })
                        }
                        db.GS_Statistic.bulkCreate([doAlarm])
                            .then((data) => logger.log("info", "Insert DB thanh cong: " + data))
                            .catch((error) => {
                                logger.log("error", "Co loi trong qua trinh thao tac DB: " + error)
                                global.io.sockets.emit("updateStatistic", { error: "Co loi trong qua trinh thao tac DB", data: [] })
                            })
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
            logger.log("error", "Co loi xay ra: " + error)
            global.io.sockets.emit("updateStatistic", { error: error, data: [] })
        }
    }
}
module.exports = socket
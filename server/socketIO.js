const socketIO = require("./controllers/socketIOController")

var users = []
const socket = (io) => {
    io.on("connection", function(socket) {
        socket.on("disconnect", function(data) {
            const username = users[socket.id]
            delete users[socket.id];
            console.log(users)
            const usersLogin = Object.values(users)
            const userfound = usersLogin.findIndex(ele => ele === username)
            if (userfound < 0) {
                console.log(username + " da thoat khoi trinh duyet")
                if (username != undefined) {
                    io.emit("userLogout", {currentLogout: username, usersLogin: usersLogin})
                }
            }
        })
        socket.on("deleteRealtime", socketIO.deleteRealtime)
        socket.on("doneSelectionTask", socketIO.doneSelectionTask)
        socket.on("doneTask", socketIO.doneTask)
        socket.on("login", function (data) {
            users[socket.id] = data.username;
            const usernames = Object.values(users)
            const usersLogin = usernames.filter((item, idx) => usernames.indexOf(item) === idx)
            io.emit("usersLogin", {currentLogin: data.username, usersLogin: usersLogin})
            console.log(usersLogin + " dang online")
        })
        socket.on("incoming_call", function(data) {
            console.log(data)
        })
    })
}

module.exports = socket
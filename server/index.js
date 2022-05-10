require('dotenv').config()

const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require("cors")

const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const app = express()
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const redisRouter = require("./routes/api/redisRouter")
const authRouter = require("./routes/api/authRouter")
const meterRouter = require("./routes/api/meterRouter")
// const webPushRouter = require("./routes/api/webPush")
const redisClient = require("./redis/redis")
const dbRouter = require("./routes/api/dbRouter")
const socketIO = require("./socketIO")

// const db = require("./config/db_connection")
const {connectDB} = require("./config/mssqlConnect")

app.use(limiter)
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api/redis", redisRouter)
app.use("/api/auth", authRouter)
app.use("/api/db", dbRouter)
app.use("/api", meterRouter)
// app.use("/api/webpush", webPushRouter)
app.use(express.static(__dirname + '/public/'))

connectDB()
const server = require("http").Server(app)

global.io = require('socket.io')(server, {
    cors: {
        credentials: true,
        origin: '*',
        methods: ["GET", "POST"]
    }
})
// app.post("/api/webpush/subcrible", (req, res)=>{
//     return res.status(200).json("success")
// })
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

// redisClient.clearCacheInterval()
redisClient.trackToTask()
if (process.env.NODE_ENV == "production") {
    server.listen(process.env.SERVER_PORT || 5000)
}else {
    server.listen(process.env.SERVER_PORT_DEV || 3000)
}
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
global.io.on("connection", function(socket) {
    console.log("Co nguoi ket noi " + socket.id)
    socket.on("disconnect", function(client) {
        console.log(socket.id + " da ngat ket noi")
    })
    socket.on("deleteRealtime", socketIO.deleteRealtime)
    socket.on("doneSelectionTask", socketIO.doneSelectionTask)
    socket.on("doneTask", socketIO.doneTask)
})
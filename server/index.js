require('dotenv').config()

const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require("cors")

const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

const app = express()
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs")
app.set("views", "./views")


const server = require("http").Server(app)

global.io = require('socket.io')(server)
app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
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

server.listen(process.env.SERVER_PORT || 5000, () => console.log(`Server started ON port ${process.env.SERVER_PORT}`))

global.io.on("connection", function(socket) {
    console.log("Co nguoi ket noi " + socket.id)
    socket.on("disconnect", function(client) {
        console.log(socket.id + " da ngat ket noi")
    })
})
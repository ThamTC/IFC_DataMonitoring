const path = require('path');

require('dotenv').config({path: path.join(__dirname, '.env')})

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
const meterRouter = require("./routes/api/meterRouter")

app.use(limiter)
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api", meterRouter)
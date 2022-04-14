const express = require("express")
const router = express.Router()
const meterController = require("../../controllers/meterController")

router.post("/alarm", meterController.alarm)
module.exports = router
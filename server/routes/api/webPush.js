const express = require("express")
const router = express.Router()
const webpushController = require("../../controllers/webpushController")

router.post("/subcribe", webpushController.subcrible)
module.exports = router
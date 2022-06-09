const express = require("express")
const router = express.Router()
const meterController = require("../../controllers/meterController")

router.post("/alarm", (req, res) => {
    return res.status(401).json("This path do not valid")
})
router.post("/realtime", meterController.realtime)
router.post("/solar/realtime", meterController.realtime)
router.post("/bmb/realtime", meterController.bmb_realtime)
module.exports = router
const express = require("express")
const router = express.Router()
const meterController = require("../../controllers/meterController")

router.post("/alarm", (req, res) => {
    return res.status(401).json("This path do not valid")
})
router.post("/realtime", meterController.realtime)
module.exports = router
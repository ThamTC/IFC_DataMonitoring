const express = require("express")
const router = express.Router()
const redisController = require("../../controllers/redisController")

router.post("/index", redisController.indexStore)

router.post("/update", redisController.updateStore)

router.post("/delete", redisController.deleteItem)

router.post("/deleteSelection", redisController.deleteSelection)

router.post("/hgetall", redisController.hgetall)

module.exports = router
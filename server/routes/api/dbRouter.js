const express = require("express")
const router = express.Router()
const dbController = require("../../controllers/dbController")

router.get("/user/index", dbController.getAll)

module.exports = router
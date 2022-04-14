const express = require("express")
const router = express.Router()
const authController = require("../../controllers/authController")
const middlewareController = require("../../controllers/middlewareController")

router.post("/login", authController.login)
router.post("/register", authController.register)
router.post("/refresh", authController.refreshToken)
router.post("/logout", authController.logout)

module.exports = router
const express = require("express")
const router = express.Router()
const dbController = require("../../controllers/dbController")

router.get("/user/index", dbController.getAllUsers)
router.post("/user/update", dbController.update)
router.post("/user/delete", dbController.delete)
router.get("/role/index", dbController.getAllRoles)
router.post("/role/create", dbController.createRole)
router.get("/permissions/index", dbController.getAllPermissions)

module.exports = router
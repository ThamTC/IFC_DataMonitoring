const express = require("express")
const router = express.Router()
const dbController = require("../../controllers/dbController")

router.get("/user/index", dbController.getAllUsers)
router.post("/user/update", dbController.update)
router.post("/user/delete", dbController.delete)
router.get("/role/index", dbController.getAllRoles)
router.get("/role/:id", dbController.getRole)
router.post("/role/create", dbController.createRole)
router.post("/role/update", dbController.updateRole)
router.post("/role/delete", dbController.deleteRole)
router.post("/role/request_role", dbController.requestRole)
router.get("/permission/index", dbController.getAllPermissions)
router.post("/permission/create", dbController.createPermission)
router.post("/permission/delete", dbController.deletePermission)
router.post("/permission/update", dbController.updatePermission)
router.post("/upload/images", dbController.uploadImages)

module.exports = router
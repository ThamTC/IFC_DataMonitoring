const express = require("express")
const router = express.Router()
const redmineController = require("./RedmineController")

router.route("/")
.get(redmineController.getIssues)
.post(redmineController.createIssue)
.patch(redmineController.updateIssue)
router.get("/counter", redmineController.getCounter)
router.get("/:id", redmineController.getIssueIndex)

module.exports = router
const express = require("express")
const router = express.Router()
const issueController = require("./IssueController")
const descriptionController = require("./descriptionController")
//
router.route("/")
.get(issueController.getIssues)
.post(issueController.createIssue)
.patch(issueController.updateIssue)
//
router.route("/description")
.get(descriptionController.index) // get description with issueid
.post(descriptionController.create)
//
router.route("/counter")
.get(issueController.getCounter)
router.get("/:id", issueController.getIssueIndex)

// .post()
// .patch()
// .delete()

module.exports = router
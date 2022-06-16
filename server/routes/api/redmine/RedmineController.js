const db = require("../../../models/index");
const { Op } = require("sequelize");

const redmineController = {
    getIssues: async (req, res, next) => {
        console.log(req.query)
        const assignee = req.query.assignee
        const fromDate = req.query.startDate;
        const toDate = req.query.endDate;
        const offset = req.query?.offset ?? 0
        const limit = req.query?.limit ?? 10
        let where = {}
        try {
            if (assignee !== "All") {
                where = {
                    assignee: assignee
                }
            }
            where.startDate = { [Op.between]: [fromDate, toDate] }
            const resData = await db.GS_Issues.findAll({
                where: where,
                offset: (parseInt(offset) - 1) * parseInt(limit),
                limit: parseInt(limit),
                raw: true,
            });
            return res.status(200).json(resData);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    getCounter: async (req, res, next) => {
        const assignee = req.query.assignee
        const fromDate = req.query.startDate;
        const toDate = req.query.endDate;
        let where = {}
        try {
            if (assignee !== "All") {
                where = {
                    assignee: assignee
                }
            }
            where.startDate = { [Op.between]: [fromDate, toDate] }
            const resData = await db.GS_Issues.count({
                where: where,
                raw: true,
            });
            return res.status(200).json(resData);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    createIssue: async (req, res, next) => {
        const issue = req.body.data;
        try {
            const isExisted = await db.GS_Issues.findOne({
                where: { subject: issue.subject },
                raw: true,
            });
            if (isExisted) {
                return res.status(400).json("Subject is existed!");
            }
            const resData = await db.GS_Issues.create(issue);
            return res.status(200).json(resData);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    updateIssue: async (req, res, next) => {
        const payload = req.body.data;
        const id = req.body.id;
        const dataUpdate = payload;
        try {
            const resData = await db.GS_Issues.update(dataUpdate, {
                where: { id: id },
                raw: true,
            });
            return res.status(200).json(resData);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    getIssueIndex: async (req, res, next) => {
        const params = req.params;
        const id = params.id;
        try {
            const resData = await db.GS_Issues.findOne({
                where: { id: id },
                raw: true,
            });
            return res.status(200).json(resData);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
}

module.exports = redmineController
const db = require("../../../models/index");
const { Op } = require("sequelize");

const descriptionController = {
    async index(req, res, next) {
        const issueId = req.query.issueId ?? 1
        try {
            const resData = await db.GS_Description.findAll({where: {issueId: issueId}, raw: true})
            return res.status(200).json(resData)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async create(req, res, next) {
        const payload = req.body.payload
        try {
            const resData = await db.GS_Description.create(payload)
            return res.status(200).json(resData)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
}

module.exports = descriptionController
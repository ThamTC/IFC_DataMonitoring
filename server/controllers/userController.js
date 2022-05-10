const db = require("../models/index")
const logger = require("../services/logger")("statistic", "db_error")

const user = {
    getAll: async() => {
        return await db.GS_UserIFC.findAll()
    }
}

module.exports = user
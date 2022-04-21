const AccessKeyModel = require("../models/accessKeyIoT")

const middlewareApiIots = {
    checkAccessKey: async (req, res, next) => {
        accessKey = req.body.accessKey
        await AccessKeyModel.findOne({accessKey: accessKey}).exec()
        if (condition) {
            
        }
        next()
    },
    checkRole: (role) => {
        return (req, res, next) => {
            next()
        }
    }
}

module.export = middlewareApiIots
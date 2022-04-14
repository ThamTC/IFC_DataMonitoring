const UserModel = require("../models/user")

const user = {
    getAll: async() => {
        return await UserModel.find()
    }
}

module.exports = user
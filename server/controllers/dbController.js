const { ObjectId } = require("mongodb");
const UserModel = require("../models/user");
const dbController = {
  getAll: async (req, res) => {
    try {
      const resData = await UserModel.find().exec();
      const dataMap = resData.map((item) => {
        return {
          username: item.username,
          email: item.email,
          role: item.role,
          createdAt: item.createdAt
        };
      });
      return res.status(200).json(dataMap);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const email = req.body.user.email
      const username = req.body.user.username
      const role = req.body.user.role
      const resData = await UserModel.findOneAndUpdate({email: email}, {username: username, role: role}).exec()
      const {password, ...other} = resData._doc
      return res.status(200).json(other)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
};

module.exports = dbController;

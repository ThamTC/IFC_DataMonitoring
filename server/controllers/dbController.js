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
};

module.exports = dbController;

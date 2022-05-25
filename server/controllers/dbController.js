
const db = require("../models/index")
const logger = require("../services/logger")("statistic", "db_error")

const dbController = {
  getAllUsers: async (req, res) => {
    try {
      const resData = await db.GS_UserIFC.findAll()
      const users = resData.filter(user => user.email !== null)
      // const resData = await UserModel.find().exec();
      const dataMap = users.map((item) => {
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
      const userUpdated = await db.GS_UserIFC.update({ username: username, role: role }, { where: { email: email } })
      console.log("userUpdated: ", userUpdated)
      if (userUpdated) {
        logger.log("info", "update user thanh cong")
        return res.status(200).json({
          email: userUpdated.email,
          username: userUpdated.username,
          role: userUpdated.role,
          createdAt: userUpdated.createdAt
        })
      }

    } catch (error) {
      logger.log("error", "" + error)
      return res.status(400).json(error)
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const resData = await db.GS_RolePermission.findAll({raw: true})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  delete: async (req, res) => {
    try {
      const resData = await db.GS_UserIFC.destroy({where: {email: req.body.user.email}})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getAllPermissions: async (req, res) => {
    try {
      const resData = await db.Permissions.findAll({raw: true})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  createRole: async (req, res) => {
    const roleName = req.body.roleName
    const permission = req.body.permission
    try {
      const resData = await db.GS_RolePermission.create({name: roleName, permission: permission})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
};

module.exports = dbController;

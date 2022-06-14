
const db = require("../models/index")
const logger = require("../services/logger")("statistic", "db_error")
const fs = require("fs")

const dbController = {
  getAllUsers: async (req, res) => {
    try {
      const resData = await db.GS_UserIFC.findAll()
      const users = resData.filter(user => user.email !== null)
      // const resData = await UserModel.find().exec();
      const dataMap = users.map((item) => {
        return {
          id: item.id,
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
  getRole: async (req, res) => {
    const user = req.params
    try {
      const resData = await db.GS_RolePermission.findOne({where: {userId: user.id}, raw: true})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const resData = await db.GS_Roles.findAll()
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  delete: async (req, res) => {
    try {
      const resData = await db.GS_UserIFC.destroy({ where: { email: req.body.user.email } })
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getAllPermissions: async (req, res) => {
    try {
      const resData = await db.Permissions.findAll({ raw: true })
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  createPermission: async (req, res) => {
    const permissioName = req.body.name
    try {
      const found = await db.Permissions.findOne({ where: { name: permissioName }, raw: true })
      if (found) {
        return res.status(404).json("Permission is existed")
      }
      const created = await db.Permissions.create({ name: permissioName })
      if (!created) {
        return res.status(404).json('Đã có lỗi xảy ra, vui lòng thử lại.');
      }
      return res.status(200).json(created)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  updatePermission: async (req, res) => {
    const userId = req.body.userId
    const permission = req.body.permission
    try {
      const found = await db.GS_RolePermission.findOne({where: {userId: userId}, raw: true})
      if (found) {
        const resData = await db.GS_RolePermission.update({permission: permission}, {where: {userId: userId}})
        return res.status(200).json(resData)
      }
      const resData = await db.GS_RolePermission.create({userId: userId, permission: permission})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error?.original.message ?? error)
    }
  },
  createRole: async (req, res) => {
    const roleName = req.body.roleName
    try {
      const resData = await db.GS_Roles.create({ name: roleName})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  deletePermission: async (req, res) => {
    const id = req.body.id
    try {
      const resData = await db.Permissions.destroy({ where: { id: id } })
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  updateRole: async (req, res) => {
    const id = req.body.id
    const data = req.body.data
    try {
      const resData = await db.GS_UserIFC.update({ role: data }, { where: { id: id } })
      await db.GS_RolePermission.update({permission: null},{where: {userId: id}})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  deleteRole: async (req, res) => {
    const id = req.body.id
    try {
      const resData = await db.GS_Roles.destroy({where: {id: id}})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  requestRole: async (req, res) => {
    try {
      return res.status(200).json("Yêu cầu đã được gử đi, vui lòng chờ xác nhận phía Management")
    } catch (error) {
      return res.status(400).json()
    }
  },
  uploadImages: async (req, res) => {
    const baseImage = req.body.image
    const fileName = req.body.fileName
    try {
      const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
      const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
      //Forming regex to extract base64 data of file.
      const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
      //Extract base64 data.
      const base64Data = baseImage.replace(regex, "");
      fs.writeFileSync(__dirname + `/../public/assets/images/${fileName}.${ext}`, base64Data, 'base64')
      return res.status(200).json("upload success")
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getIssues: async (req, res, next) => {
    try {
      const resData = await db.GS_Issues.findAll()
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  createIssue: async (req, res, next) => {
    const issue = req.body.data
    try {
      const isExisted = await db.GS_Issues.findOne({where: {subject: issue.subject}, raw: true})
      if (isExisted) {
        return res.status(400).json("Subject is existed!")
      }
      const resData = await db.GS_Issues.create(issue)      
      return res.status(200).json(resData)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  },
  updateIssue: async (req, res, next) => {
    const payload = req.body.data
    const id = req.body.id
    const dataUpdate = payload
    try {
      const resData = await db.GS_Issues.update(dataUpdate, {where: {id: id}})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getIssueIndex: async (req, res, next) => {
    const params = req.params
    const id = params.id
    try {
      const resData = await db.GS_Issues.findOne({where: {id: id}})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getIssueByUser: async (req, res, next) => {
    const params = req.params
    try {
      const resData = await db.GS_Issues.findAll({where: {assignee: params.assignee}})
      return res.status(200).json(resData)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
};

module.exports = dbController;

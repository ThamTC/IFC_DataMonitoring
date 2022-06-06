const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const redisToken = require("../redis/redis")
const emailExistence = require("../utils/checkEmail")
const { connectDB } = require("../config/mssqlConnect")
const db = require("../models/index")
const logger = require("../services/logger")("authenticates", "auth")

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        }, process.env.ACCESS_TOKEN, { expiresIn: "1d" })
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        }, process.env.REFRESH_TOKEN, { expiresIn: "365d" })
    },
    login: async (req, res) => {
        // const email = req.body.email
        // const password = req.body.password
        try {
            const conn = await connectDB()
            var user;
            if (conn?.success) {
                user = await db.GS_UserIFC.findOne({ where: { email: req.body.email }, raw: true })
                if (!user) {
                    logger.log("info", "Email không tồn tại")
                    return res.status(404).json("Email không tồn tại")
                }
            } else {
                logger.log("info", "Mất kết nối tới DB")
                return res.status(401).json("Mất kết nối tới DB")
            }
            // const user = await UserModel.findOne({ email: req.body.email }).exec()
            // if (!user) {
            //     return res.status(404).json("Email không tồn tại")
            // }
            const rolePermission = await db.GS_RolePermission.findOne({ where: { userId: user.id }, raw: true }) ?? []
            // if (rolePermission) {
                
                const permissions = JSON.parse(rolePermission?.permission ?? "[]")
            // }else{
            //     const Permissions = []
            // }
            // const rolePermission = await RolePermissionModel.findOne({name: user.role}).exec() ?? []
            
            const isPass = await bcrypt.compare(req.body.password, user.password)
            if (!isPass) {
                logger.log("info", "Sai mật khẩu")
                return res.status(404).json("Sai mật khẩu")
            }
            user.permissions = permissions
            const accessToken = authController.generateAccessToken(user)
            const refreshToken = authController.generateRefreshToken(user)
            redisToken.storeToken("accessToken", accessToken)
            redisToken.storeToken("refreshToken", refreshToken)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            // const {
            //     password,
            //     ...others
            // } = user._doc
            logger.log("info", user.username + " đăng nhập thành công")
            return res.status(200).json({
                accessToken
            })
        } catch (err) {
            logger.log("error", "Đăng nhập thất bại: " + err)
            return res.status(500).json(err)
        }
    },
    register: async (req, res) => {
        try {
            const username = req.body.username
            const email = req.body.email

            //check exist email on cloud
            const isEmailExist = await emailExistence.check(email)
            if (!isEmailExist) {
                logger.log("error", 'Email không tồn tại trên Cloud')
                return res.status(404).json('Email không tồn tại trên Cloud');
            }
            const conn = await connectDB()
            var user;
            if (conn?.success) {
                user = await db.GS_UserIFC.findOne({ where: { email: email }, raw: true })
                if (user) {
                    logger.log("error", "Email đã được đăng ký")
                    return res.status(404).json("Email đã được đăng ký")
                }
            } else {
                logger.log("error", "Mất kết nối tới DB")
                return res.status(401).json("Mất kết nối tới DB")
            }
            // const user = await UserModel.findOne({ email: email }).exec()
            // if (user)
            //     return res.status(404).json('Email đã tồn tại.');

            const password = req.body.password
            const pwdConfirmation = req.body.pwdConfirmation
            if (password != pwdConfirmation) {
                logger.log("error", "Nhập sai Pasword")
                return res.status(404).json("Nhập sai Pasword")
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = {
                username: username,
                email: email,
                password: hashPassword,
                role: process.env.ROLE_DEFAULT
            };
            const createUser = await db.GS_UserIFC.create(newUser)
            if (!createUser) {
                logger.log("error", 'Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.')
                return res.status(404).json('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
            }
            logger.log("info", "Đăng ký thành công")
            return res.status(200).json("Đăng ký thành công");
        } catch (err) {
            logger.log("error", "Đăng ký thất bại: " + err)
            return res.status(500).json(err)
        }


    },

    logout: (req, res) => {
        const accessToken = req.body.accessToken
        redisToken.clearAccessToken(accessToken)
        var refreshToken = req.cookies?.refreshToken
        if (!redisToken.isExistToken(refreshToken)) {
            return res.status(403).json("Refresh Token is not existed")
        }
        res.clearCookie("refreshToken")
        return res.status(200).json("Logged out !")
    },

    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated")
        }

        if (!redisToken.isExistToken(refreshToken)) {
            return res.status(403).json("Refresh Token is not valid")
        }
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid")
                }
                // create new accessToken, new refreshToken
                var newAccessToken = authController.generateAccessToken(user)
                var newRefreshToken = authController.generateRefreshToken(user)
                redisToken.storeToken("accessToken", newAccessToken)
                redisToken.storeToken("refreshToken", newRefreshToken)
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                return res.status(200).json(newAccessToken)
            })
        } catch (err) {
            return res.status(500).json("Có lỗi trong quá trình refresh token")
        }

    },
    isLogged: (req, res) => {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            return res.status(401).json("Token is not valid")
        }
        if (!redisToken.isExistToken(refreshToken)) {
            return res.status(403).json("Token is not valid")
        }
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    return res.status(403).json(err.message)
                }
                return res.status(200).json(
                    refreshToken
                )
            })
        } catch (err) {
            return res.status(403).json(err.message)
        }
    },
    changePassword: async (req, res) => {
        const email = req.body.email
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        try {
            const userFound = await db.GS_UserIFC.findOne({ where: { email: email }, raw: true })
            if (!userFound) {
                return res.status(401).json(`Not Found accout with email ${{ email }}`)
            }
            const isPass = await bcrypt.compare(oldPassword, userFound.password)
            if (!isPass) {
                return res.status(400).json("Mật khẩu cũ không đúng")
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPassword, salt);
            const user = await db.GS_UserIFC.update({ password: hashPassword }, { where: { email: email } })
            if (!user) {
                return res.status(400).json("Truy vấn DB thất bại")
            }
            return res.status(200).json("Thay đổi mật khẩu thành công")
        } catch (error) {
            return res.status(401).json(error.message)
        }
    }
}
module.exports = authController
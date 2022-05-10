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
            email: user.email
        }, process.env.ACCESS_TOKEN, { expiresIn: "1d" })
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email
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
            const rolePermission = await db.GS_RolePermission.findOne({ where: { name: user.role }, raw: true }) ?? []
            // const rolePermission = await RolePermissionModel.findOne({name: user.role}).exec() ?? []
            const permissions = JSON.parse(rolePermission.permission)
            const isPass = await bcrypt.compare(req.body.password, user.password)
            if (!isPass) {
                logger.log("info", "Sai mật khẩu")
                return res.status(404).json("Sai mật khẩu")
            }
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
            const email = user.email
            const username = user.username
            const role = user.role
            logger.log("info", "Đăng nhập thành công")
            return res.status(200).json({
                email, username, role,
                permissions,
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
        const userReq = req.body?.user
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
                    userReq
                )
            })
        } catch (err) {
            return res.status(403).json(err.message)
        }
    }
}
module.exports = authController
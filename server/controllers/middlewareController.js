const jwt = require("jsonwebtoken")

const middlewareController = {
    isLoggin: (req, res, next) => {
        const refreshToken = req.cookies.refreshToken
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    throw err
                }
                req.user = user
            })
            next()
        } else {
            return res.status(401).json("Token is not valid")
        }

    },
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json("Your're not authenticated")
        }
    }
}

module.exports = middlewareController
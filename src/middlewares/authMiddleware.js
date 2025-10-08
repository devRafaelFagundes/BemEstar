require("dotenv").config()
const crypto = require("crypto")
const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")
// const tokenMinutesLimit = require("../controllers/authController")

const authMiddleware = async (req, res, next) =>{
    //get token from the cookie
    const token = req.cookies?.token;
    if(!token) {
        const error = new Error("No token (or refresh token) available")
        error.statusCode = 401
        return next(error)
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            username : decodedToken.username
        })
        if (!user) {
            const error = new Error("No user found");
            error.statusCode = 404;
            return next(error)
        }
        req.userInfo = decodedToken;
        return next();
    } catch (error) {
        const decodedExpired = jwt.decode(token);
        if(error.name !== "TokenExpiredError") {
            const err = new Error("Invalid Token");
            err.statusCode = 403;
            return next(err)
        }
        console.log("Token expirado")
        const refreshToken = req.cookies?.refreshToken;
        if(!refreshToken) {
            const error =  new Error('No token (or refresh token) available')
            error.statusCode = 401
            return next(error)
        }
        const matchRefresh = await User.findOne({
            "refreshToken.token" : refreshToken
        })

        if(!matchRefresh || !matchRefresh.refreshToken || new Date() > matchRefresh.refreshToken.expiresAt) {
            const err = new Error("Invalid refresh token, please login again")
            err.statusCode = 403
            return next(err)
        }
        
        delete decodedExpired.exp
        delete decodedExpired.iat

        console.log("Refresh token válido")
        const newToken = jwt.sign(
            decodedExpired
            , process.env.JWT_SECRET, {
            expiresIn : '15m'
        })
        console.log("novo token criado")
        res.cookie("token", newToken, {
            httpOnly : true,
            secure : false,
            sameSite: 'Lax',
            maxAge :  1000 * 60 * 60 * 24 * 7,
            path: '/'
        })
        console.log("Novo cookie criado com o token")
        req.userInfo = decodedExpired;
        return next()
    }            
}


module.exports = authMiddleware
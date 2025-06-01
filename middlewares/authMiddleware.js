require("dotenv").config()
const jwt = require("jsonwebtoken")
const authMiddleware = async (req, res, next) =>{
    //get token from the cookie
    const token = req.cookies.token;
    if(!token) {
        const err = new Error('No token available')
        err.statusCode = 401;
        return next(err);
    }
    try {

        //check if it is valid
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            const err = new Error('Invalid Token');
            err.statusCode = 401;
            return next(err);
        }

        req.userInfo = decodedToken;
        next();
    } catch (error) {
        return next(error)
    }
}

module.exports = authMiddleware
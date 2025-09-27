const express = require("express");
const authRouter = express.Router();
const {register, logIn, logout, confirmUser} = require('../controllers/authController')

//here i will put the register and login routes, the controllers have the logic
authRouter.post('/register', register)
authRouter.post('/login', logIn)
authRouter.get('/logout', logout)

authRouter.get('/confirm/:random', confirmUser)

module.exports = authRouter;
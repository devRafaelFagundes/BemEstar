const express = require("express");
const authRouter = express.Router();
const {register, logIn, logout} = require('../controllers/authController')

//here i will put the register and login routes, the controllers have the logic
authRouter.post('/register', register)
authRouter.post('/login', logIn)
authRouter.get('/logout', logout)

module.exports = authRouter;
const express = require("express");
const authRouter = express.Router();
const {register, logIn} = require('../controllers/authController')

//here i will put the register and login routes, the controllers have the logic
authRouter.post('/register', register)
authRouter.post('/login', logIn)

module.exports = authRouter;
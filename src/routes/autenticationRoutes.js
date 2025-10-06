const express = require("express");
const authRouter = express.Router();
const {logIn, logout, confirmUser, generateTemporaryUser} = require('../controllers/authController')

//here i will put the register and login routes, the controllers have the logic
authRouter.post('/register', generateTemporaryUser)
authRouter.post('/login', logIn)
authRouter.get('/logout', logout)

authRouter.get('/confirm/:random', confirmUser)

module.exports = authRouter;
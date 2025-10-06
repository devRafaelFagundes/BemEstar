"use strict";
const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const professionalMiddleware = require('../middlewares/professionalMiddleware');
const renderRouter = express.Router();
renderRouter.get('/home', authMiddleware, (req, res) => {
    const userInfo = req.userInfo;
    res.render("inside/homepage", { userInfo });
});
renderRouter.get('/', (req, res) => {
    res.render("homePage");
});
renderRouter.get("/start", (req, res) => {
    res.render("outside/auths/register");
});
renderRouter.get("/info/:id", (req, res) => {
    res.render("inside/userInfo");
});
module.exports = renderRouter;
//# sourceMappingURL=renderRoutes.js.map
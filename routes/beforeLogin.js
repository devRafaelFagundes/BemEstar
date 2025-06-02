const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router();

router.get('/home', (req, res)=>{
    res.render("homePage");
})
router.get("/start", (req, res)=>{
    res.render("outside/auths/registerLog");
})
router.get('/protectedTest', authMiddleware, (req, res)=>{
    res.send("this is protected");
})

module.exports = router;
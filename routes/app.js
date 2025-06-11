const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router();

router.get('/home', authMiddleware, (req, res) => {
    res.render("inside/homepage");
})

module.exports = router;
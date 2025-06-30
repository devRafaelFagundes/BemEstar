const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const professionalMiddleware = require('../middlewares/professionalMiddleware');
const router = express.Router();

//this page is for the professional
//need a middleware to only let access for professional users
router.get('/home', authMiddleware, (req, res) => {
    res.render("inside/homepage");
})

router.post('/join', authMiddleware, professionalMiddleware)

module.exports = router;
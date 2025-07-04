const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const professionalMiddleware = require('../middlewares/professionalMiddleware');
const router = express.Router();


router.get('/home', authMiddleware, (req, res) => {
    res.render("inside/homepage");
})

router.post('/join', authMiddleware, professionalMiddleware)

module.exports = router;
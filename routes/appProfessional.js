const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const professionalMiddleware = require('../middlewares/professionalMiddleware');
const joinFunction = require("../controllers/joinController")
const router = express.Router();


router.get('/home', authMiddleware, (req, res) => {
    res.render("inside/homepage");
})

router.post('/join', authMiddleware, professionalMiddleware, joinFunction)
module.exports = router;
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const professionalMiddleware = require('../middlewares/professionalMiddleware');
const router = express.Router();


router.get('/home', authMiddleware, (req, res) => {
    res.render("inside/homepage");
})

router.post('/join', authMiddleware, professionalMiddleware)

router.get('/ping', authMiddleware);
//use, in the frontend, for refreshing the token (after 10 minutes for example)

module.exports = router;
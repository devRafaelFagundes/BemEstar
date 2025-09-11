const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const professionalMiddleware = require('../middlewares/professionalMiddleware');
const joinFunction = require("../controllers/joinController")
const router = express.Router();
const {clientsPersonal} = require('../controllers/clientsController')

// router.get('/home', authMiddleware, (req, res) => {
//     const userInfo = req.userInfo;
//     res.render("inside/homepage", {userInfo});
// })

router.post('/join', authMiddleware, professionalMiddleware, joinFunction)

router.get('/:id', authMiddleware, clientsPersonal)

module.exports = router;
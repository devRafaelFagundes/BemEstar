const express = require("express")

const authMiddleware =  require("../middlewares/authMiddleware")
const professionalMiddleware = require("../middlewares/professionalMiddleware")

const clientsRouter = express.Router()
const {clientController} = require('../controllers/clientsController')

clientsRouter.get('/', authMiddleware, professionalMiddleware, (req, res, next) => {
    clientController.getClients(req, res, next)
})

clientsRouter.post('/personal/update', authMiddleware, (req, res, next) => {
    clientController.updatePersonal(req, res, next)
})

module.exports = clientsRouter;

const express = require("express")

const authMiddleware =  require("../middlewares/authMiddleware")
const professionalMiddleware = require("../middlewares/professionalMiddleware")

const clientsRouter = express.Router()


const {getClients} = require('../controllers/clientsController')

clientsRouter.get('/', authMiddleware, professionalMiddleware, getClients)

module.exports = clientsRouter;

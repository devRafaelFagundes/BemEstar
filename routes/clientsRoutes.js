const express = require("express")

const authMiddleware =  require("../middlewares/authMiddleware")
const professionalMiddleware = require("../middlewares/professionalMiddleware")

const clientsRouter = express.Router()


const {getClients, clientsPersonal, updatePersonal} = require('../controllers/clientsController')

clientsRouter.get('/', authMiddleware, professionalMiddleware, getClients)

clientsRouter.get('/personal/:id?', authMiddleware, clientsPersonal)

clientsRouter.post('/personal/update', authMiddleware, updatePersonal)

module.exports = clientsRouter;

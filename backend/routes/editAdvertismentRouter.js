const { Router } = require('express')
const editAdvertismentRouter = Router()
const editAdvertismentController = require('../controllers/editAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')

editAdvertismentRouter.post('/editAdvertisment', checkSession, editAdvertismentController.edit)

module.exports = editAdvertismentRouter
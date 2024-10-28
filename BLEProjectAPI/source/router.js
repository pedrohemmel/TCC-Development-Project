const express = require('express')

//Controllers
const deviceController = require('./controller/deviceController.js')

const router = express.Router();

//deviceController
router.get('/devices', deviceController.getDevices)
router.post('/devices', deviceController.addNewDevice)

module.exports = router
const express = require('express')

//Controllers
const deviceController = require('./controller/deviceController.js')

const router = express.Router();

//deviceController
router.get('/devices', deviceController.getDevices)

module.exports = router
const router = require('express').Router()
const tokens = require('../controllers/AuthTokens')
const devices = require('../controllers/Devices')
const deviceControl = require('../controllers/DeviceControl')

router.route('/authorize')
  .get(tokens.getTokens)

router.route('/devices')
  .get(devices.getAllDevicesFromTuya)
  .post(deviceControl.setDeviceState)
  .put(devices.changeFriendlyName)
module.exports = router
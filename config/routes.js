const router = require('express').Router()
const tokens = require('../controllers/PlugSockets/AuthTokens')
const devices = require('../controllers/PlugSockets/Devices')
const deviceControl = require('../controllers/PlugSockets/DeviceControl')
const sonos = require('../controllers/Sonos/DeviceInfo')
const sonosAuth = require('../controllers/Sonos/Auth')

router.route('/authorize')
  .get(tokens.getTokens)

router.route('/plugs')
  .get(devices.getAllDevicesFromTuya)
  .post(deviceControl.setDeviceState)
  .put(devices.changeFriendlyName)

router.route('/sonos/household')
  .get(sonos.getHousehold)

router.route('/sonos/groups')
  .get(sonos.getGroups)

router.route('/sonos/auth')
  .get(sonosAuth.getTokens)
  .post(sonosAuth.addTokens)








module.exports = router
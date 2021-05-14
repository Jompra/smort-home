const axios = require('axios')
const Devices = require('../models/Devices')
const { getAccessToken } = require('./AuthTokens')

async function setDeviceState(req, res) {
  const deviceName = req.body.name
  const state = req.body.state

  const deviceInfo = await Devices.findOne({ friendlyName: deviceName })
  const accessToken = await getAccessToken()

  const requestData = {
    'header': {
      'name': 'turnOnOff',
      'namespace': 'control',
      'payloadVersion': 1
    },
    'payload': {
      'accessToken': accessToken,
      'devId': deviceInfo.deviceId,
      'value': state
    }
  }
  try {
    await axios({
      method: 'post',
      url: 'https://px1.tuyaeu.com/homeassistant/skill',
      data: requestData
    })
  
    const updatedDevice = await Devices.findOneAndUpdate({ friendlyName: deviceName }, { isActive: state }, { new: true })
    res.status(200).json(updatedDevice)
  } catch (error) {
    res.status(422).json(error.message)
  }

}

module.exports = {
  setDeviceState
}
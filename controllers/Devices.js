const axios = require('axios')
const Devices = require('../models/Devices')
const { refreshTokens, getAccessToken } = require('./AuthTokens')

async function buildRequestData() {
  const requestData = {
    'header': {
      'name': 'Discovery',
      'namespace': 'discovery',
      'payloadVersion': 1
    },
    'payload': {
      'accessToken': await getAccessToken()
    }
  }
  console.log('requestData', requestData)
  return requestData
}

function reformatDeviceObject(devices) {
  return devices.map(device => {
    return ({
      friendlyName: device.name,
      isOnline: device.data.online,
      isActive: device.data.state,
      deviceId: device.id,
      tuyaName: device.name
    })
  })
}

async function addOnlyNewDevicesToDB(newDeviceList){
  const currentList = await Devices.find()
  if (newDeviceList.length === currentList.length) return

  const uniqueDevices = newDeviceList.filter(device => !currentList.includes(device))

  return await Devices.create(uniqueDevices)
}

async function getAllDevicesFromTuya(req, res) {
  await refreshTokens()
  const response = await axios({
    method: 'post',
    url: 'https://px1.tuyaeu.com/homeassistant/skill',
    data: await buildRequestData(),
    headers: { 'content-type': 'application/json' }
  })

  const updatedDevices = await addOnlyNewDevicesToDB(reformatDeviceObject(response.data.payload.devices))

  res.status(200).json({ Devices: updatedDevices })
}

async function changeFriendlyName(req, res) {
  const oldName = req.body.name
  const newName = req.body.newName

  const updatedDevice = await Devices.findOneAndUpdate({ friendlyName: oldName }, { friendlyName: newName }, { new: true })

  res.status(200).json({ message: 'Success', device: updatedDevice })
}

module.exports = {
  getAllDevicesFromTuya,
  changeFriendlyName
}
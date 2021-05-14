const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  friendlyName: { type: String, default: this.tuyaName },
  isOnline: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
  deviceId: { type: String, required: true },
  tuyaName: { type: String, required: true },
  location: { type: String }
})

module.exports = mongoose.model('Devices', deviceSchema)
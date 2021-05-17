const mongoose = require('mongoose')

const sonosTokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true }
})

module.exports = mongoose.model('SonosTokens', sonosTokenSchema)
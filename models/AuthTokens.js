const mongoose = require('mongoose')

const authTokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  token_type: { type: String, required: true },
  expires_in: { type: Number, required: true },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: 72000
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('AuthTokens', authTokenSchema)
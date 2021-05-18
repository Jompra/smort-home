const sonosTokens = require('../../models/Sonos/AuthTokens')

async function getTokens(req, res) {
  const tokens = await sonosTokens.find()
  res.status(200).json(tokens[0])
}

async function addTokens(req, res) {
  const currentTokens = await sonosTokens.find()
  if (currentTokens.length > 0) {
    await sonosTokens.findByIdAndDelete(currentTokens[0]._id)
  }
  const newTokens = await sonosTokens.create(req.body)
  res.status(201).json(newTokens)
}

module.exports = {
  getTokens,
  addTokens
}
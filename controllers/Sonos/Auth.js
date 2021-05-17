// const axios = require('axios')
// const qs = require('qs')
const sonosTokens = require('../../models/Sonos/AuthTokens')

// function getEncodedTokens(){
//   const key = process.env.SONOSKEY
//   const secret = process.env.SONOSSECRET
//   const buffer = new Buffer.from(`${key}:${secret}`)
//   const encodedTokens = buffer.toString('base64')
//   return encodedTokens
// }

// TODO: Test This Function
// async function refreshTokens(){
//   const url = 'https://api.sonos.com/login/v3/oauth/access'
//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//     Authorization: `Basic ${getEncodedTokens()}`
//   }
//   const formData = {
//     grant_type: 'refresh_token',
//     refresh_token: await sonosTokens.find()[0].refresh_token
//   }
//   const data = qs.stringify(formData)

//   const response = axios({
//     method: 'get',
//     url,
//     headers,
//     data
//   })
//   const currentTokens = await sonosTokens.find()
//   if (currentTokens.length > 0) {
//     await sonosTokens.findByIdAndDelete(currentTokens[0]._id)
//   }
//   const newTokens = await sonosTokens.create({ access_token: response.data.access_token, refresh_token: response.data.refresh_token })
//   return newTokens
// }

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
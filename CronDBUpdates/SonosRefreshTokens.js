require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const qs = require('qs')
const SonosToken = require('../models/Sonos/AuthTokens')
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smort-stuff'

function getEncodedTokens() {
  const key = process.env.SONOSKEY
  const secret = process.env.SONOSSECRET
  const buffer = new Buffer.from(`${key}:${secret}`)
  const encodedTokens = buffer.toString('base64')
  return encodedTokens
}

async function refreshTokens() {
  mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    (err) => {
      if (err) return console.log(err)
      console.log('Mongo is Connected!')
    })

  const authTokens = await SonosToken.find()
  const url = 'https://api.sonos.com/login/v3/oauth/access'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: `Basic ${getEncodedTokens()}`
  }
  const formData = {
    grant_type: 'refresh_token',
    refresh_token: authTokens[0].refresh_token
  }

  const response = await axios({
    method: 'post',
    url,
    headers,
    data: qs.stringify(formData)
  })

  const filter = { refresh_token: authTokens[0].refresh_token }
  const update = { access_token: response.data.access_token, refresh_token: response.data.refresh_token }

  const updatedTokens = await SonosToken.findOneAndUpdate(filter, update, { new: true })

  mongoose.connection.close()
  return updatedTokens
}

refreshTokens()
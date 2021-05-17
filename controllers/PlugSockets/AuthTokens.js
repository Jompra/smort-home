const axios = require('axios')
const qs = require('qs')

const AuthToken = require('../../models/Tuya/AuthTokens')

const loginData = {
  'userName': process.env.USERNAME,
  'password': process.env.PASSWORD,
  'countryCode': process.env.COUNTRYCODE,
  'bizType': process.env.BIZTYPE,
  'from': process.env.FROMAPI
}

async function getNewTokens() {
  console.log('new tokens running')
  try {
    const response = await axios({
      method: 'post',
      url: 'https://px1.tuyaeu.com/homeassistant/auth.do',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(loginData)
    })

    if (response.data.hasOwnProperty('errorMsg')) {
      console.log(response.data.errorMsg)
      return
    }

    const createdTokens = await AuthToken.create(response.data)

    return createdTokens
  } catch (error) {
    console.log(error.message)
  }
}

async function refreshTokens() {
  console.log('******Refreshing Tokens MMMMMMMM ******')
  const tokens = await AuthToken.find()

  const params = {
    grant_type: 'refresh_token',
    refresh_token: tokens[0].refresh_token,
    rand: Math.random()
  }
  console.log('old tokens: ', tokens)
  const newTokens = await axios({
    method: 'get',
    url: 'https://px1.tuyaeu.com/homeassistant/access.do',
    params: params
  })
  console.log(newTokens)
  const newInfo = { access_token: newTokens.data.access_token, refresh_token: newTokens.data.refresh_token }
  const updatedInfo = await AuthToken.findOneAndUpdate({ token_type: 'bearer' }, newInfo)

  console.log(updatedInfo)
}

async function getTokens(req, res) {
  console.log('gettokens is running')
  console.log(loginData)
  try {
    const tokens = await getTokensFromDb()

    res.status(200).json(tokens)
  } catch (error) {
    res.status(422).json({ message: error.message })
  }
}

async function getTokensFromDb(){
  try {
    let tokens = await AuthToken.find()

    if (tokens.length < 1) {
      await getNewTokens()
      tokens = await AuthToken.find()
    }
    return tokens[0]

  } catch (error) {
    return new Error(error.message)
  }
}

async function getAccessToken(){
  const allTokens = await getTokensFromDb()
  return allTokens.access_token
}

module.exports = {
  getTokens,
  refreshTokens,
  getAccessToken
}
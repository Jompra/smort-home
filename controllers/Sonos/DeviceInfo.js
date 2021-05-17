const axios = require('axios')
const household = require('../../models/Sonos/Household')
const sonosTokens = require('../../models/Sonos/AuthTokens')

async function getHouseholdFromAPI(){
  const authToken = await sonosTokens.find()
  const URL = 'https://api.ws.sonos.com/control/api/v1/households/'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken[0].access_token}`
  }
  const response = await axios({
    method: 'get',
    url: URL,
    headers
  })
  console.log('response = ', response.data)
  return response.data.households[0].id
}

async function getHousehold(req, res){
  let householdId = await household.find()
  if (householdId.length < 1){
    const newHouseholdId = await getHouseholdFromAPI()
    householdId = await household.create({ householdId: newHouseholdId })
  }
  console.log(householdId)
  res.status(200).json(householdId)
}

async function getGroupsFromAPI(){
  const authToken = await sonosTokens.find()
  const householdIdDocument = await household.find()
  const url = `https://api.ws.sonos.com/control/api/v1/households/${householdIdDocument[0].householdId}/groups`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken[0].access_token}`
  }
  const response = await axios({
    method: 'get',
    url,
    headers
  })
  console.log(response.data)
  return response.data
}

async function getGroups(req, res){
  const groups = await getGroupsFromAPI()
  res.status(200).json(groups)
}

module.exports = {
  getHousehold,
  getGroups
}
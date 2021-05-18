const Weather = require('../../models/Information/Weather')

async function getTodayForecast(req, res){
  const forecast = await Weather.find({}, { hourly: 0, daily: 0 })
  res.status(200).json(forecast[0])
}

module.exports = {
  getTodayForecast
}
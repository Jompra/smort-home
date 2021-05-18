const mongoose = require('mongoose')

const dailySchema = new mongoose.Schema({
  sunrise: { type: Number, required: true },
  sunset: { type: Number, required: true },
  moonrise: { type: Number, required: true },
  moonset: { type: Number, required: true },
  day_temp: { type: Number, required: true },
  min_temp: { type: Number, required: true },
  max_temp: { type: Number, required: true },
  night_temp: { type: Number, required: true },
  evening_temp: { type: Number, required: true },
  morning_temp: { type: Number, required: true },
  day_feels_like: { type: Number, required: true },
  night_feels_like: { type: Number, required: true },
  morning_feels_like: { type: Number, required: true },
  evening_feels_like: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  dew_point: { type: Number, required: true },
  uvi: { type: Number, required: true },
  clouds: { type: Number, required: true },
  wind_speed: { type: Number, required: true },
  wind_deg: { type: Number, required: true },
  main_weather: { type: String, required: true },
  weather_description: { type: String, required: true }
})

const hourlySchema = new mongoose.Schema({
  time: { type: Number, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  dew_point: { type: Number, required: true },
  uvi: { type: Number, required: true },
  clouds: { type: Number, required: true },
  visibility: { type: Number, required: true },
  wind_speed: { type: Number, required: true },
  wind_deg: { type: Number, required: true },
  main_weather: { type: String, required: true },
  weather_description: { type: String, required: true }
})

const weatherSchema = new mongoose.Schema({
  sunrise: { type: Number, required: true },
  sunset: { type: Number, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  dew_point: { type: Number, required: true },
  uvi: { type: Number, required: true },
  clouds: { type: Number, required: true },
  visibility: { type: Number, required: true },
  wind_speed: { type: Number, required: true },
  wind_deg: { type: Number, required: true },
  main_weather: { type: String, required: true },
  weather_description: { type: String, required: true },
  hourly: [hourlySchema],
  daily: [dailySchema]
})

module.exports = mongoose.model('Weather', weatherSchema)
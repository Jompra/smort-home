require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const Weather = require('../models/Information/Weather')
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smort-stuff'

async function getWeatherFromAPI() {
  const url = 'https://api.openweathermap.org/data/2.5/onecall'
  const params = {
    lat: process.env.LAT,
    lon: process.env.LON,
    units: 'metric',
    appid: process.env.APIKEY
  }

  const response = await axios({
    method: 'get',
    url,
    params
  })
  return response.data
}

async function addToDb(){
  const data = await getWeatherFromAPI()
  const weatherSchema = createWeatherSchema(data)

  mongoose.connect(dbURI, (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })

  const currentSchema = await Weather.find()
  if (currentSchema.length > 0){
    await Weather.findByIdAndDelete(currentSchema[0]._id)
  }

  await Weather.create(weatherSchema)
  mongoose.connection.close()
}

function createHourlySchemas(hourlyForecasts) {
  const schema = hourlyForecasts.map(forecast => {
    return {
      time: forecast.dt,
      temp: forecast.temp,
      feels_like: forecast.feels_like,
      pressure: forecast.pressure,
      humidity: forecast.humidity,
      dew_point: forecast.dew_point,
      uvi: forecast.uvi,
      clouds: forecast.clouds,
      visibility: forecast.visibility,
      wind_speed: forecast.wind_speed,
      wind_deg: forecast.wind_deg,
      main_weather: forecast.weather[0].main,
      weather_description: forecast.weather[0].description
    }
  })
  return schema
}

function createDailySchemas(dailyForecasts) {
  const schema = dailyForecasts.map(forecast => {
    return {
      time: forecast.dt,
      sunrise: forecast.sunrise,
      sunset: forecast.sunset,
      moonrise: forecast.moonrise,
      moonset: forecast.moonset,
      day_temp: forecast.temp.day,
      min_temp: forecast.temp.min,
      max_temp: forecast.temp.max,
      night_temp: forecast.temp.night,
      evening_temp: forecast.temp.eve,
      morning_temp: forecast.temp.morn,
      day_feels_like: forecast.feels_like.day,
      night_feels_like: forecast.feels_like.night,
      morning_feels_like: forecast.feels_like.morn,
      evening_feels_like: forecast.feels_like.eve,
      pressure: forecast.pressure,
      humidity: forecast.humidity,
      dew_point: forecast.dew_point,
      uvi: forecast.uvi,
      clouds: forecast.clouds,
      wind_speed: forecast.wind_speed,
      wind_deg: forecast.wind_deg,
      main_weather: forecast.weather[0].main,
      weather_description: forecast.weather[0].description
    }
  })
  return schema
}

function createWeatherSchema(weather) {
  return {
    sunrise: weather.current.sunrise,
    sunset: weather.current.sunset,
    temp: weather.current.temp,
    feels_like: weather.current.feels_like,
    pressure: weather.current.pressure,
    humidity: weather.current.humidity,
    dew_point: weather.current.dew_point,
    uvi: weather.current.uvi,
    clouds: weather.current.clouds,
    visibility: weather.current.visibility,
    wind_speed: weather.current.wind_speed,
    wind_deg: weather.current.wind_deg,
    main_weather: weather.current.weather[0].main,
    weather_description: weather.current.weather[0].description,
    hourly: createHourlySchemas(weather.hourly),
    daily: createDailySchemas(weather.daily)
  }
}

addToDb()
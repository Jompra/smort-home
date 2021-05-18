import React from 'react'
import axios from 'axios'

async function getWeather(){
  const response = axios({
    method: 'get'
  })
}

function WeatherWidget(){
  return(
    <div className='weather-widget'>
      <div className=''>

      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react'

function DateAndTime() {
  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

  return (
    <div className='time-date-widget'>
      <div className='time-box'>
        <p>{dt.split(',')[1]}</p>
      </div>
      <div className='date-box'>
        <p>{dt.split(',')[0]}</p>
      </div>
    </div>
  )
}

export default DateAndTime
import React from 'react'
import axios from 'axios'

import DateAndTime from '../widgets/TimeDate'

function Topbar(){
  return(
    <div className='top-bar'>
      <DateAndTime />
      
    </div>
  )
}

export default Topbar
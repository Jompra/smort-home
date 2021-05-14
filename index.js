require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smort-stuff'
const router = require('./config/routes')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  }
)

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`))
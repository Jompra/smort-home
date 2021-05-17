const mongoose = require('mongoose')

const householdSchema = new mongoose.Schema({
  householdId: { type: String, required: true }
})

module.exports = mongoose.model('HouseholdId', householdSchema)
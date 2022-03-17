const mongoose = require('mongoose')

const reqNumber = {
    type: Number,
    required: true
}

const reqString = {
    type: String,
    required: true
}

const reqBoolean = {
    type: Boolean,
    required: true
}

const userSchema = mongoose.Schema({
    _id: reqString,
    username: reqString,
    messages: reqNumber,
    unix_timestamp_of_join: reqString,
    unix_timestamp_of_leave: reqString,
    is_booster: reqBoolean,
    hasApprovedSuggestion: reqBoolean,
    hasInterested: reqBoolean,
    is_staff: reqBoolean
})

module.exports = mongoose.model('user-databse', userSchema)
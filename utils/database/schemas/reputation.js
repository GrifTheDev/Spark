const mongoose = require('mongoose')

const reqNumber = {
    type: Number,
    required: true
}

const reqString = {
    type: String,
    required: true
}


const repSchema = mongoose.Schema({
    _id: reqString,
    repAmount: reqNumber,
    pointAmount: reqNumber,
    pointsTowardRep: reqNumber,
    cuurentRole: reqString,
    userID: reqString,
    username: reqString
})

module.exports = mongoose.model('rep-databse', repSchema)
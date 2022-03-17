const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqArray = {
    type: Array,
    required: true
}

const achivementSchema = mongoose.Schema({
    _id: reqString, // member id
    lockedAchievements: reqArray,
    unlockedAchievements: reqArray,
    allAchievements: reqArray
})

module.exports = mongoose.model('achievements', achivementSchema)
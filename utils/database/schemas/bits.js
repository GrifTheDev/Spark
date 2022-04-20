const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}


const reqArray = {
    type: Array,
    required: true
}

const bitSchema = mongoose.Schema({
    _id: reqString, // member id
    bits: reqNumber, // the number of bits a member has
    multiplier: reqNumber, // this is the number by which the bits are multiplied every time a member gets one, stacks with the global multiplier,
    punishmentQuota: reqNumber, // when a member gets punished, they can be enforced a punishment qouta, a percantage of their bits, that will be taken away every time they might earn it
    log: reqArray // an array where we store a log of members bit income.
})

module.exports = mongoose.model('bits', bitSchema)
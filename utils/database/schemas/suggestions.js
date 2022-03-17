const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const suggestionSchema = mongoose.Schema({
    _id: reqString,
    authorName: reqString,
    authorID: reqString,
    suggestionStatus: reqString,
    suggestion: reqString,
    suggestionURL: reqString,
    lastSuggestionEditTimestamp: reqString,
    suggestionTimestamp: reqString,
    messageID: reqString,
    suggestionID: reqString
})

module.exports = mongoose.model('suggestion-db', suggestionSchema)
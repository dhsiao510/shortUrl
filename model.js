const mongoose = require('mongoose');

const shortenUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
    },
    uniqueId: {
        type: String,
    },
    shortUrl: {
        type: String,
    }
})

module.exports = mongoose.model('Model', shortenUrlSchema)
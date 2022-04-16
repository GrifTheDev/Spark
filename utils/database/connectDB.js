const mongoose = require('mongoose')
const logger = require('../logging/logger')

async function connectDB() {

    logger.info("Attempting to connect to the MongoDB database.")

    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.mongoSRV, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        logger.info("Successfully connected to the MongoDB database.")

    } catch (error) {
        logger.error("There was an error while trying to connect to the MongoDB database.\n\n" + error)
    }

    
}

module.exports = {
    connectDB: connectDB
}
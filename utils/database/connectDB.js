const mongoose = require('mongoose')

async function connectDB() {

    console.log("[NOTICE] Connect to Database :: Attempting to connect to the MongoDB database.")

    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.envmongoSRV, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("[SUCCESS] Connect to Database :: Successfully connected to the MongoDB database.")

    } catch (error) {
        console.log("[CRITICAL FAILURE] Connect to Database :: There was an error while trying to connect to the MongoDB database.\n\n" + error)
    }

    
}

module.exports = {
    connectDB: connectDB
}
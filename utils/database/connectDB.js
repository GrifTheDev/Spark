const mongoose = require('mongoose')
const { mongoSRV } = require("../../config")

async function connectDB() {

    console.log("[NOTICE] Connect to Database :: Attempting to connect to the MongoDB database.")

    try {
        await mongoose.connect(mongoSRV, {
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
const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
    try {
        // Return a promise
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.error(error.message);
        // Exit process with failure Error 1
        process.exit(1);
    }
};

module.exports.connectDB = connectDB;

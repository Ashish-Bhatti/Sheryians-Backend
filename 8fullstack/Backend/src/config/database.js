const mongoose = require('mongoose');

// process.env.MONGO_URI = to connect uri from .env
function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected to database');
    });
}

module.exports = connectToDB;

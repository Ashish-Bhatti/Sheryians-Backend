const mongoose = require('mongoose');

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('server is connected to database');
}

module.exports = connectToDB;

/*
run server
connect to database
require dotenv
 */

// npm i dotenv - to use .env file we need to install it

require('dotenv').config(); // to use env we need to require it first

const app = require('./src/app');

const connectToDB = require('./src/config/database');

connectToDB();

app.listen(3000, () => {
    console.log('server running');
});

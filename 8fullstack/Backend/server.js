/*
run server
connect to db
connect to dotenv
 */
require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');
connectToDB();

app.listen(3000, () => {
    console.log('server running');
});

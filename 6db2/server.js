/*
 - start server
 - connect to database
 */

const app = require('./src/app')

const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect("")
    .then(()=>{
        console.log('connected to database')
    })
}

connectToDB()
app.listen(3000,()=>{
    console.log('server running')
})
/*
 - start server
 - connect to database
 */

const app = require('./src/app')

const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect("mongodb+srv://ashishbhattidev_db_user:CPUX7KRgfjM4EXlz@cluster0.dkmbyz9.mongodb.net/6db2")
    .then(()=>{
        console.log('connected to database')
    })
}

connectToDB()
app.listen(3000,()=>{
    console.log('server running')
})
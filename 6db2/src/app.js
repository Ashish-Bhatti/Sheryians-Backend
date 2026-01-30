/*
 - create server
 - config server
 */

const express = require('express')

const app = express()

app.use(express.json()) // middeleware to read json data

app.get('/',(req,res)=>{
    res.send('hello ashu')
})

module.exports = app;
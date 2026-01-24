const express = require('express')

const app = express()

app.use(express.json()) // middleware - without it express can't read json data

let notes = []

app.post('/notes',(req,res)=>{ // post method api
    console.log(req.body)       // loggin the data to check
    notes.push(req.body)       // push data in notes array
    res.send('note created')
})

app.get('/notes',(req,res)=>{ // get method api
    res.send(notes)           // send data to frontend/postman
})

app.listen(3000,()=>{
    console.log('server is running') // just a callback function to log 'server on'
})
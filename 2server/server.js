const express = require('express')

const app = express() // server created

app.get('/',(req,res)=>{  // (define route) or response
    res.send('hello world')
})

app.get('/about',(req,res)=>{
    res.send('This is about page')
})

app.get('/home',(req,res)=>{
    res.send('This is Home page')
})

app.listen(3000) // server started
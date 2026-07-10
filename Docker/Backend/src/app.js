import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.status(200).json({
        message : 'hello there'
    })
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        message : 'server is running properly'
    })
})

export default app;

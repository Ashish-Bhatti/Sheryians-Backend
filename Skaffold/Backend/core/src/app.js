import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello there',
    });
});

app.get('/count', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 10000000; i++) {
        sum += i;
    }
    res.status(200).json({
        message: 'user data',
        sum,
    });
});

app.get('/get-me',(req,res)=>{
    res.status(200).json({
        message : 'this is me ASHU'
    })
})

export default app;

import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

/*
express.urlencoded() → Reads HTML form request bodies.
extended: true → Can parse complex/nested form data.
 */
app.use(express.urlencoded({extended : true})) // it is middleware just like json - it help us to read form data from html file and extended means it can read complex data like nested

app.get('/api/sandbox/health',(req,res)=>{
    res.status(200).json({
        message : 'Sandbox API is healthy',
        status : 'ok'
    })
})

export default app
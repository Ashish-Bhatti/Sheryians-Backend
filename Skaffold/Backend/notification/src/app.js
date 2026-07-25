import express from 'express';
import morgan from 'morgan';
import axios from 'axios';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello there',
    });
});

app.get("/count", async (req, res) => {
    try {
        const response = await axios.get("http://core-service/count");
        res.json(response.data);
    } catch (error) {
        console.error(error.message);

        if (error.response) {
            console.log(error.response.data);
        }

        res.status(500).json({
            message: error.message,
        });
    }
});
export default app;

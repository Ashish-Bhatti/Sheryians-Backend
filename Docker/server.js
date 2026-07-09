import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server is running successfully',
    });
});
const data = {
    id: 1,
    user: 'ashu',
    age: 25,
};

app.get('/data', (req, res) => {
    res.status(200).json(data);
});

app.listen(3000, () => {
    console.log('server is running on port 300');
});

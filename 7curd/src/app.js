/*
create server
config server
 */

const express = require('express');

const noteModel = require('./models/notes.model');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello how are you');
});

app.post('/notes', async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title,
        description,
    });

    res.status(201).json({
        msg: 'note created',
        note,
    });
});

app.get('/notes', async (req, res) => {
    const note = await noteModel.find();
    res.status(201).json({
        note,
    });
});

module.exports = app;

/*
- server create
- server config
 */

const express = require('express');
const app = express();

app.use(express.json());

let notes = [];

app.get('/', (req, res) => {
    res.send('hey i am here');
});

app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: 'note create successfully',
    });
});

app.get('/notes', (req, res) => {
    res.status(200).json({
        notes: notes,
    });
});

app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index];
    res.status(204).json({
        message: 'successfully deleted',
    });
});

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description = req.body.description;
    res.status(201).json({
        message: 'successfully edited',
    });
});

app.put('/notes/:index', (req, res) => {
    notes[req.params.index] = req.body;
    res.status(201).json({
        message: 'successfully updated',
    });
});

module.exports = app;

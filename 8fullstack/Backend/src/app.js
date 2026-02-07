/*
create server
config server
 */

const express = require('express');
const noteModel = require('./models/notes.model.js');

const cors = require('cors');
const app = express();
app.use(express.json()); // middleware
app.use(cors()); // middleware

app.get('/', (req, res) => {
    res.send('hello there');
});

/**
 * - POST /api/notes
 * - create new note and save data in mongodb
 * - req.body = {title,description}
 */

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    const notes = await noteModel.create({ title, description });

    res.status(201).json({
        msg: 'successful',
        notes,
    });
});

/**
 * - GET /api/notes
 * - Fetch all the notes data from mongodb and send them in the response
 */

app.get('/api/notes', async (req, res) => {
    const note = await noteModel.find();
    res.status(201).json({
        msg: 'successful fetched',
        note,
    });
});

/**
 * - DELETE /api/notes/:id
 * - Delete note with the id from req.params
 */

app.delete('/api/notes/:id', async (req, res) => {
    await noteModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
        msg: 'successfully deleted',
    });
});

/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    await noteModel.findByIdAndUpdate(id, { description });
    res.status(201).json({
        msg: 'successfull',
    });
});

module.exports = app;

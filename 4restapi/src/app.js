/*
- create server
- config server
*/
const express = require('express');
const app = express();

// Middleware: essential for parsing JSON bodies from incoming requests
app.use(express.json());

let notes = [];

/* --- ROUTES --- */

// Basic landing route
app.get('/', (req, res) => {
    res.send('hello world');
});

/* POST method api - /notes: Create a new note */
app.post('/notes', (req, res) => {
    console.log(req.body); // Log the data being sent
    notes.push(req.body);  // Add the new note to the array
    res.send('note created');
});

/* GET method api - /notes: Retrieve all notes */
app.get('/notes', (req, res) => {
    res.send(notes);
});

/* DELETE method api - /notes: Remove a specific note using its index */
app.delete('/notes/:index', (req, res) => {
    // Note: delete leaves 'undefined' holes; splice(index, 1) is a common alternative
    delete notes[req.params.index];
    console.log(req.params.index);
    res.send('note deleted');
});

/* PATCH method api - /notes: Update only a specific part (description) of a note */
app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description = req.body.description;
    res.send('note modified');
});

/* PUT method api - /notes: Replace the entire object at a specific index */
app.put('/notes/:index', (req, res) => {
    // Overwrites the item at the index with the full request body
    notes[req.params.index] = req.body;
    res.send('note replaced');
});

module.exports = app;
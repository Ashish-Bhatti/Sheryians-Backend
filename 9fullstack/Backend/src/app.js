/*
create server
configure server
 */

const express = require('express');
const app = express();

const noteModel = require('./models/notes.model');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

// it will serve the static files from public folder to the browser
// which means if we have any file in public folder than we can access it by calling localhost:5000/filename
// and if we change the path to './src' than we can access the files in src folder by calling localhost:5000/filename
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     res.send('hello there');
// });

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;
    await noteModel.create({ title, description });
    res.status(201).json({
        msg: 'note created',
        title,
        description,
    });
});

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(201).json({
        msg: 'notes fetched',
        notes,
    });
});

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(201).json({
        msg: 'successfully deleted',
    });
});

app.patch('/api/notes/:id', async (req, res) => {
    const { description } = req.body;
    const id = req.params.id;
    await noteModel.findByIdAndUpdate(id, { description });
    res.status(201).json({
        msg: 'successfullu update',
    });
});

/*
//** wild card route - if we call an api which we didn't create than it will run
//** __dirname - it will automatic gives the path from root directory to current file
 */
app.get('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
    console.log('this is wild card route')
})

module.exports = app;

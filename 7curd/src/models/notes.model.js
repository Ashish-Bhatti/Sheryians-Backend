/*
    -  Schema - to tell database about data format
    -  Model - we need model to perform CURD operation
 */

const mongoose = require('mongoose');

// create schema
const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
});

// create model
const noteModel = mongoose.model('notes', noteSchema);

module.exports = noteModel;

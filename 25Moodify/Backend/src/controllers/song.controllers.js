const songModel = require('../models/song.model');
const storageService = require('../services/storage.service');
const id3 = require('node-id3'); //it is used to read all the data inside a file

async function uploadSong(req, res) {
    const songBuffer = req.file.buffer;
    const mood = req.body.mood;

    const tags = id3.read(songBuffer);

    /* const songFile = await storageService.uploadFile({
        buffer: songBuffer,
        filename: tags.title + '.mp3',
        folder: '/Moodify/songs',
    });

    const posterFile = await storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + '.jpeg',
        folder: '/Moodify/posters',
    }); */

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + '.mp3',
            folder: '/Moodify/songs',
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + '.jpeg',
            folder: '/Moodify/posters',
        }),
    ]);

    console.log(songFile, posterFile, mood);

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood,
    });

    return res.status(201).json({
        message: 'song created successfully',
        song,
    });
}

async function getSong(req, res) {
    const mood = req.query.mood;

    const song = await songModel.find({mood})

    return res.status(200).json({
        message : 'song fetched successfully',
        song
    })
}

module.exports = {
    uploadSong,
    getSong,
};

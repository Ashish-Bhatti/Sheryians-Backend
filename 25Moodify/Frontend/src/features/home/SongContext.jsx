import React, { createContext, useState } from 'react';

export const SongContext = createContext();

const SongProvider = ({ children }) => {
    const [song, setSong] = useState({
        url: 'https://ik.imagekit.io/ashuImageKit/Moodify/songs/Bandhan__From__Vanvaas___C7ZoFSBYy.mp3',
        posterUrl: 'https://ik.imagekit.io/ashuImageKit/Moodify/posters/Bandhan__From__Vanvaas___pusbKd2uuF.jpeg',
        title: 'Bandhan (From "Vanvaas")',
        mood: 'sad',
    });

    const [loading, setLoading] = useState(false)

    return <SongContext.Provider value={{ song, setSong,loading, setLoading }}>{children}</SongContext.Provider>;
};

export default SongProvider;

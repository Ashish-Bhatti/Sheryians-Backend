import React, { useContext } from 'react';
import { SongContext } from '../SongContext';
import { getSong } from '../services/song.api';

const useSong = () => {
    const context = useContext(SongContext);
    const { song, setSong, loading, setLoading } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);
        const data = await getSong({ mood });
        setSong(data.song);
        setLoading(false);
    }

    return { loading, song, handleGetSong };
};

export default useSong;

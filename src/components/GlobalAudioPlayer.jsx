// GlobalAudioPlayer.js
import React, { useRef, useEffect } from 'react';

const GlobalAudioPlayer = ({ currentAudio }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentAudio) {
            audioRef.current.src = currentAudio.url;
            audioRef.current.play();
        }
    }, [currentAudio]);

    return (
        <audio ref={audioRef} controls style={{ display: 'none' }}>
            <source type="audio/mpeg" />
        </audio>
    );
};

export default GlobalAudioPlayer;

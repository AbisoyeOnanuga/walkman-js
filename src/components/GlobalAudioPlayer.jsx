// GlobalAudioPlayer.js
import React, { useRef } from 'react';

const GlobalAudioPlayer = ({ currentAudio }) => {
    const audioRef = useRef(null);

    return (
        <audio ref={audioRef} controls style={{ display: 'none' }}>
            <source type="audio/mpeg" />
        </audio>
    );
};

export default GlobalAudioPlayer;

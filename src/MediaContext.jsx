import React, { createContext, useState, useContext } from 'react';

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
    const [playing, setPlaying] = useState(null);

    return (
        <MediaContext.Provider value={{ playing, setPlaying }}>
        {children}
        </MediaContext.Provider>
    );
};

export const useMedia = () => {
    return useContext(MediaContext);
};

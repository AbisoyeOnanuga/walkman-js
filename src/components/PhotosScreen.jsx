import React, { useEffect, useState } from 'react';
import axios from 'axios';

clientid = Process.env.REACT_APP_IMGUR_CLIENT_ID

const PhotosScreen = () => {
  const [photos, setPhotos] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://api.imgur.com/3/gallery/t/landscape/day/0?showViral=true', {
          headers: {
            'Authorization': `Bearer ${clientid}`,
          },
        });
        setPhotos(response.data.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError(err);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="photos-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      <div className="screen-content">
        <h2>Landscape Photos</h2>
        {error ? (
          <p className="error-message">Failed to load photos: {error.message}</p>
        ) : (
          <div className="photo-gallery">
            {photos.map(photo => (
              <img 
                key={photo.id}
                src={photo.images.original}
                alt={photo.note}
                width="120px" 
                height="234px" 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosScreen;

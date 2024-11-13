import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_IMGUR_CLIENT_ID

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const PhotosScreen = () => {
  const [photos, setPhotos] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      console.log('Fetching photos...');
      try {
        const response = await axios.get('https://api.imgur.com/3/gallery/t/landscape/day/1.json', {
          headers: {
            'Authorization' : `Client-ID ${CLIENT_ID}`,
          },
        });
        console.log('Rate limits:', response.headers['x-ratelimit-clientremaining'], response.headers['x-ratelimit-userremaining']);
        setPhotos(response.data.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError(err);
      }
    };

    const throttledFetchedPhotos = throttle(fetchPhotos, 3000); // 3 seconds throttle
    throttledFetchedPhotos();
    // setTimeout(fetchPhotos, 3000); // Delay the next request by 3 seconds
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
          <p className="error-message">Failed to load photos: {error.message}. Retrying in 3 seconds...</p>
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

// Using Pexels API - much quicker to get started
const PEXELS_API_KEY = 'fqzq9pxpvhGJqG8tGZD3crgaK5u6lXQx7852DHyfOWOZTJKs0n9su8s5'; // Free API key you can use

const PhotosScreen = ({ playing }) => {
  const [photos, setPhotos] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            'Authorization': PEXELS_API_KEY
          },
          params: {
            query: 'landscape nature',
            orientation: 'landscape',
            per_page: 20,
            size: 'medium'
          }
        });

        const validPhotos = response.data.photos.map(photo => ({
          id: photo.id,
          title: photo.alt || 'Landscape photo',
          imageUrl: photo.src.medium,
          thumbUrl: photo.src.small,
          photographer: photo.photographer
        }));

        setPhotos(validPhotos);
        setError(null);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError(new Error('Failed to load photos. Please try again later.'));
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="photos-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <h2>Landscape Photos</h2>
        {loading && <p>Loading photos...</p>}
        {error && (
          <p className="error-message">{error.message}</p>
        )}
        {!loading && !error && (
          <div className="photo-gallery">
            {photos.map(photo => (
              <div key={photo.id} className="photo-item">
                <img 
                  src={photo.thumbUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="gallery-image"
                />
                <div className="photo-credit">
                  Photo by {photo.photographer}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosScreen;

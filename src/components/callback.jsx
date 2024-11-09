// src/components/Callback.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('https://api.imgur.com/oauth2/token', {
          client_id: process.env.REACT_APP_IMGUR_CLIENT_ID,
          client_secret: process.env.REACT_APP_IMGUR_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://localhost:3000/callback',
        });

        const { access_token } = response.data;
        localStorage.setItem('imgur_access_token', access_token);
      } catch (err) {
        console.error('Error fetching token:', err);
      }
    };

    if (code) {
      fetchToken();
    }
  }, [code]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default Callback;

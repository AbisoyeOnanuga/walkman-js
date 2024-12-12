import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './WeatherScreen.css';

const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
const DEFAULT_CITY = 'sydney'; // Fallback city
const DEFAULT_COUNTRY = 'AU';  // Fallback country

if (!RAPID_API_KEY) {
  console.error('RapidAPI key is missing. Please check your .env file.');
}

const WeatherScreen = ({ playing }) => {
  // Initialize city from localStorage or use default
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('weatherCity');
    return savedCity || DEFAULT_CITY;
  });
  
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputCity, setInputCity] = useState('');
  const [showInput, setShowInput] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!RAPID_API_KEY) {
      setError('API key is missing. Please check configuration.');
      return;
    }

    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${cityName}/AU`,
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      const data = response.data;
      
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      setWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].icon),
        wind: {
          speed: Math.round(data.wind.speed * 3.6),
          direction: getWindDirection(data.wind.deg)
        },
        visibility: Math.round(data.visibility / 1000),
        sunrise,
        sunset,
        clouds: data.clouds.all
      });
      setError(null);
      setShowInput(false); // Hide input after successful fetch
    } catch (err) {
      console.error('Weather API Error:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('API authentication failed. Please check API key.');
        } else if (err.response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'City not found'}`);
        }
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    const interval = setInterval(() => fetchWeather(city), 600000);
    return () => clearInterval(interval);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      const newCity = inputCity.trim().toLowerCase();
      setCity(newCity);
      // Save to localStorage
      localStorage.setItem('weatherCity', newCity);
      setInputCity('');
    }
  };

  // Convert wind degrees to cardinal directions
  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  // Convert weather codes to icons
  const getWeatherIcon = (iconCode) => {
    const icons = {
      '01d': '☀️',  // clear sky day
      '01n': '🌙',  // clear sky night
      '02d': '⛅',  // few clouds day
      '02n': '☁️',  // few clouds night
      '03d': '☁️',  // scattered clouds
      '03n': '☁️',
      '04d': '☁️',  // broken clouds
      '04n': '☁️',
      '09d': '🌧️',  // shower rain
      '09n': '🌧️',
      '10d': '🌦️',  // rain
      '10n': '🌧️',
      '11d': '⛈️',  // thunderstorm
      '11n': '⛈️',
      '13d': '🌨️',  // snow
      '13n': '🌨️',
      '50d': '🌫️',  // mist
      '50n': '🌫️'
    };
    return icons[iconCode] || '❓';
  };

  return (
    <div className="weather-screen">
      <Header playing={playing} />
      <div className="screen-content">
        {showInput ? (
          <form onSubmit={handleSubmit} className="city-input-form">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Enter city name"
              className="city-input"
            />
            <button type="submit" className="city-submit">✓</button>
            <button 
              type="button" 
              className="city-cancel"
              onClick={() => setShowInput(false)}
            >
              ✕
            </button>
          </form>
        ) : (
          <button 
            className="change-city-btn"
            onClick={() => setShowInput(true)}
          >
            Change City
          </button>
        )}

        {loading ? (
          <div className="weather-loading">Loading...</div>
        ) : error ? (
          <div className="weather-error">{error}</div>
        ) : weather ? (
          <div className="weather-info">
            <div className="weather-location">{weather.city.toUpperCase()}</div>
            <div className="weather-main">
              <span className="weather-icon">{weather.icon}</span>
              <span className="weather-temp">{weather.temp}°C</span>
            </div>
            <div className="weather-details">
              <div className="weather-description">
                {weather.description}
              </div>
              <div className="temp-range">
                H:{weather.temp_max}° L:{weather.temp_min}°
              </div>
              <div className="weather-feels-like">
                Feels like: {weather.feels_like}°C
              </div>
              <div className="weather-extra">
                <div>Wind: {weather.wind.speed}km/h {weather.wind.direction}</div>
                <div>Humidity: {weather.humidity}%</div>
                <div>Visibility: {weather.visibility}km</div>
              </div>
              <div className="weather-sun">
                <div>☀️ {weather.sunrise}</div>
                <div>🌙 {weather.sunset}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherScreen; 
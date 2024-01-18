import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './WeatherScreen.css';

// Use environment variables with fallbacks for production
const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY || 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8';
const WEATHER_API_HOST = process.env.REACT_APP_WEATHER_API_HOST || 'weather-data-api1.p.rapidapi.com';
const DEFAULT_CITY = 'sydney'; // Fallback city
const DEFAULT_COUNTRY = 'AU';  // Fallback country

const WeatherScreen = ({ playing }) => {
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
    const options = {
      method: 'GET',
      url: `https://${WEATHER_API_HOST}/find-location`,
      params: {
        q: cityName,
        limit: '1'
      },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': WEATHER_API_HOST
      }
    };

    try {
      setLoading(true);
      const locationResponse = await axios.request(options);
      
      if (!locationResponse.data || locationResponse.data.length === 0) {
        throw new Error('City not found');
      }

      const location = locationResponse.data[0];
      
      // Now fetch the weather data for the location
      const weatherOptions = {
        method: 'GET',
        url: `https://${WEATHER_API_HOST}/check-forecast`,
        params: {
          lat: location.lat,
          lon: location.lon
        },
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': WEATHER_API_HOST
        }
      };

      const weatherResponse = await axios.request(weatherOptions);
      
      // Get current weather (first item in the list)
      const currentWeather = weatherResponse.data.list[0];
      const cityData = weatherResponse.data.city;

      setWeather({
        city: location.name,
        temp: Math.round(currentWeather.main.temp - 273.15), // Convert Kelvin to Celsius
        feels_like: Math.round(currentWeather.main.feels_like - 273.15),
        temp_min: Math.round(currentWeather.main.temp_min - 273.15),
        temp_max: Math.round(currentWeather.main.temp_max - 273.15),
        humidity: currentWeather.main.humidity,
        description: currentWeather.weather[0].description,
        icon: getWeatherIcon(currentWeather.weather[0].icon),
        wind: {
          speed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
          direction: getWindDirection(currentWeather.wind.deg)
        },
        visibility: Math.round(currentWeather.visibility / 1000),
        sunrise: new Date(cityData.sunrise * 1000).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sunset: new Date(cityData.sunset * 1000).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        clouds: currentWeather.clouds.all
      });
      
      setError(null);
      setShowInput(false);
    } catch (err) {
      console.error('Weather API Error:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('API authentication failed. Please check API key.');
        } else if (err.response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError(`Error: ${err.response.status} - ${err.response.data?.message || 'City not found'}`);
        }
      } else {
        setError(err.message || 'Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    const interval = setInterval(() => fetchWeather(city), 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      const newCity = inputCity.trim().toLowerCase();
      setCity(newCity);
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
            <button type="submit" className="city-submit">��</button>
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
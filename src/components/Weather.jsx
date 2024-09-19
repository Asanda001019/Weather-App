import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import rain_icon from '../assets/rain.png';
import storm_icon from '../assets/storm.png';
import sunny_icon from '../assets/sunny.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const AllIcons = {
    "01d": sunny_icon,
    "01n": sunny_icon,
    "02d": sunny_icon,
    "02n": sunny_icon,
    "03d": storm_icon,
    "03n": storm_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": storm_icon,
    "11n": storm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": humidity_icon,
    "50n": humidity_icon,
  };

  const search = async (city) => {
    if (city === '') {
      alert("Enter City Name");
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      if (!apiKey) {
        throw new Error('API key is not defined');
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      
      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json();
        if (data.message === 'city not found') {
          alert("Please enter the correct city name");
        } else {
          alert("Error fetching data. Please try again.");
        }
        return;
      }

      const data = await response.json();

      const icon = AllIcons[data.weather[0].icon] || sunny_icon; // Default to sunny_icon

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setError("Error fetching the data. Please try again.");
      console.error("Error fetching the data", error);
    }
  };

  useEffect(() => {
    search('Pietermaritzburg');
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='weather'>
        <h3>Navigate Your Day with the Right Weather</h3>
        <div className="search-bar">
          <input ref={inputRef} type='text' placeholder='Search' />
          <img src={search_icon} alt='Search' onClick={() => search(inputRef.current.value)} />
        </div>

        {weatherData && (
          <>
            <img src={weatherData.icon} alt='Weather Icon' className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
              <div className='col'>
                <img src={humidity_icon} alt="Humidity" />
                <div>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className='col'>
                <img src={wind_icon} alt="Wind Speed" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className='footer'>
          <p>&copy; 2024 Asanda Madondo. Weather App. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Weather;

import React, { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import rain_icon from '../assets/rain.png';
import storm_icon from '../assets/storm.png';
import sunny_icon from '../assets/sunny.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import clear_icon from '../assets/wind.png';


const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark'); // Default theme
  const [unit, setUnit] = useState('metric'); // Default unit

  const AllIcons = {
    "01d": sunny_icon,
    "01n": sunny_icon,
    "02d": clear_icon,
    "02n": clear_icon,
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
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json();
        alert(data.message === 'city not found' ? "Please enter the correct city name" : "Error fetching data. Please try again.");
        return;
      }

      const data = await response.json();
      const icon = AllIcons[data.weather[0].icon] || sunny_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        coord: data.coord,
      });

    } catch (error) {
      setError("Error fetching the data. Please try again.");
      console.error("Error fetching the data", error);
    }
  };

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedUnit = localStorage.getItem('unit') || 'metric';
    setTheme(savedTheme);
    setUnit(savedUnit);
    search('Pietermaritzburg');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeUnit = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
    if (weatherData) {
      search(weatherData.location); // Re-fetch weather data with new units
    }
  };

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`max-w-lg mx-auto flex flex-col items-center justify-center p-10 ${theme === 'light' ? 'bg-blue-300' : 'bg-gray-800'} rounded-lg mb-12 mt-10`}>
      <h3 className={`text-${theme === 'light' ? 'blue-500' : 'white'} text-lg mb-8 underline`}>Navigate Your Day with the Right Weather</h3>
      <div className="flex items-center gap-3 mb-6">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className={`h-12 px-4 rounded-full border-none outline-none ${theme === 'light' ? 'bg-blue-200 text-black' : 'bg-gray-700 text-white'} text-lg`}
        />
        <img
          src={search_icon}
          alt="Search"
          className={`w-12 p-3 rounded-full ${theme === 'light' ? 'bg-blue-200' : 'bg-gray-700'} cursor-pointer`}
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      <img src={weatherData.icon} alt="Weather Icon" className="w-36 my-8" />
      <p className={`text-${theme === 'light' ? 'blue-500' : 'white'} text-7xl`}>{weatherData.temperature}{temperatureUnit}</p>
      <p className={`text-${theme === 'light' ? 'blue-500' : 'white'} text-3xl`}>{weatherData.location}</p>
      
      <div className="flex justify-between w-full mt-10 text-blue-500">
        <div className="flex items-start gap-2">
          <img src={humidity_icon} alt="Humidity" className="w-6 mt-2" />
          <div>
            <p className={`text-2xl ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>{weatherData.humidity} %</p>
            <span className={`text-sm ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>Humidity</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <img src={wind_icon} alt="Wind Speed" className="w-6 mt-2" />
          <div>
            <p className={`text-2xl ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>{weatherData.windSpeed} Km/h</p>
            <span className={`text-sm ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>Wind Speed</span>
          </div>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className={`mt-4 p-2 rounded ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      {/* Units Selection */}
      <select onChange={changeUnit} value={unit} className={`mt-4 p-2 rounded ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'}`}>
        <option value="metric">Celsius (°C)</option>
        <option value="imperial">Fahrenheit (°F)</option>
      </select>
    </div>
  );
};

export default Weather;

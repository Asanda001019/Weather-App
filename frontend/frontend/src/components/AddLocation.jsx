import React, { useState } from 'react';

const LocationInput = () => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to fetch weather data for the entered location
    console.log(`Location: ${location}`);
  };

  return (
    <form className="location-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter your location"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default LocationInput;
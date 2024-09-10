import React, { useEffect } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import rain_icon from "../assets/rain.png"
import storm_icon from "../assets/storm.png"
import sunny_icon from "../assets/sunny.png"

const Weather = () => {


const search = async (city)=>{
    try {
       
     const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=4b92aa0b9e21aca9f0c280b101a9ccb6`;
      
     //api.openweathermap.org/data/2.5/weather?q=London&appid=4b92aa0b9e21aca9f0c280b101a9ccb6
    //  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
   const response = await fetch(url);
   const data = await response.json();
   console.log(data);
   
    }catch (error){

    }
}

useEffect(()=>{
    search("London")
},[])

search("London")

  return (
    <div className='weather'>
        <div className="search-bar">
            <input type='text' placeholder='Search' />
            <img src={search_icon} alt='' />
        </div>
        <img src={sunny_icon} alt='' className='weather-icon'/>
        <p className='temperature' >16°c</p>
        <p className='location'>London</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={storm_icon} alt=""/>
                <div>
                <p>91 %</p>
                <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={rain_icon} alt=""/>
                <div>
                <p>3.6 Km/h</p>
                <span>Wind Speed</span>
                </div>
            </div>
        </div>
     </div>
  )
}

export default Weather
import React, { useState } from 'react';

const dateFucntion = (e) => {
    let months = ["Janury", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ( ${month} ${date}, ${year} )`;
  }

export default function WeatherForcast() {
    const [city, City] = useState('');
    const [weather, Weather] = useState({});
  
    const search = searchbtn => {
  
      if (searchbtn.key === "Enter") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7d050a5813620c4ed2979245c1fb2a1e`)
          .then(res => res.json())
          .then(result => {
            Weather(result);
            City('');
            console.log(result);
          });
      }
    }
    return (
        <>
      <div className="image">
        <main>
            <input type="text" className="search" placeholder="Enter Name City" onChange={s => City(s.target.value)} value={city} onKeyPress={search}/>
            {(typeof weather.main != "undefined") ? (
            <div>
                  <div className="weather">{weather.name}, {weather.sys.country}</div>
                  <div className="weather">{dateFucntion(new Date())}</div>
                  <img className="weather" src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"} />
                  <div className="weather">Temperature: {Math.round((weather.main.temp)-273.15)}°C</div>
                  <div className="weather">Weather: {weather.weather[0].main}</div>
                  <div className="weather">Temperature - Max: {Math.round((weather.main.temp_max)-273.15)}°C</div>
                  <div className="weather">Temperature - Min: {Math.round((weather.main.temp_min)-273.15)}°C</div>
                  <div className="weather">Wind Speed: {weather.wind.speed} km/h</div>
              </div>
            ): ('')}
        </main>
      </div>
        </>
  )
}

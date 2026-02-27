import { useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import "./WeatherApp.css";



const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);


  const fetchWeather = async () => {
    try {
  console.log(import.meta.env.VITE_WEATHER_API_KEY)

        let API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather(currentRes.data);
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
    } catch (error) {
      alert("City not found");
    }
  };
return (
  <div className="app">
    <header className="header">
      <h1>🌤 Weather Tracker</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
    </header>

    {weather && (
      <main className="content">
        <section className="current-weather">
          <h2>{weather.name}</h2>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>{weather.weather[0].description}</p>

          <div className="details">
            <div>💧 Humidity<br />{weather.main.humidity}%</div>
            <div>💨 Wind<br />{weather.wind.speed} m/s</div>
          </div>
        </section>

        <Forecast forecast={forecast} />
      </main>
    )}
  </div>
);
};

export default WeatherApp;

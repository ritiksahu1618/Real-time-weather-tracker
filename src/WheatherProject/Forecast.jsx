// import React from "react";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast">

      <h2>5-Day Forecast</h2>

      <div className="forecast-cards">
        
        {forecast.map((day, index) => (
          <div className="forecast-card" key={index}>
            <p>{new Date(day.dt_txt).toDateString()}</p>
            <h3>{Math.round(day.main.temp)}°C</h3>
            <p>{day.weather[0].main}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;

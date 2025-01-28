import React, { useState } from "react";
import clockIcon from "../assets/clock.png";

const WeatherCard = ({
  city,
  temperature,
  time,
  aqi,
  isTempCard,
  isAQICard,
  isTimeCard,
  isLocationCard,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <div className="weather-card">
      <div className="weather">
        <img
          className="weather-icon"
          src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
          alt="weather"
        />
        {isTempCard ? (
          <>
            <h1 className="temp" id="temperatureOnly">
              {temperature}°C
            </h1>
            <h2 className="city">Temperature</h2>
          </>
        ) : isAQICard ? (
          <>
            <h1 id="aqiOnly">{aqi}</h1>
            <h2 className="city">AQI</h2>
          </>
        ) : isTimeCard ? (
          <>
            <h1 id="timeOnly" style={{ marginTop: "-10px" }}>
              {time}
            </h1>
            <h2 className="city">Clock</h2>
          </>
        ) : isLocationCard ? (
          <>
            <div
              className="search"
              id="search"
              style={{
                display: "flex",
                height: "50%",
                width: "98%",
                margin: "10px",
              }}
            >
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Enter city name"
                  spellCheck="false"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <h1 className="temp" id="temperature">
              {temperature}°C
            </h1>
            <h2 className="city">{city}</h2>
            <div className="details">
              <div className="col">
                <img
                  className="humi"
                  src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
                  alt="humidity"
                />
                <div className="info">
                  <p className="humidity" id="aqi">
                    {aqi}
                  </p>
                  <p>AQI</p>
                </div>
              </div>
              <div className="col">
                <img src={clockIcon} alt="clock" />
                <div className="info">
                  <p className="wind">
                    <span id="time">{time}</span>
                  </p>
                  <p>CLOCK</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;

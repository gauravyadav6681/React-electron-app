import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const App = () => {
  const apiKey = "d8975a3672c5f867b0d05db6426f1d5b";
  const timeApiKey = "0DA66704YBUZ";

  const [currentCity, setCurrentCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [activeCard, setActiveCard] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocationTabActive, setIsLocationTabActive] = useState(false);

  useEffect(() => {
    fetchWeatherData(currentCity);
    fetchAQIData(currentCity);
    getCityTime(currentCity);
  }, [currentCity]);

  const fetchWeatherData = async (city) => {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      const response = await fetch(weatherAPI);
      const data = await response.json();
      const temperature = (data.main.temp - 273.15).toFixed(2);
      setWeatherData({
        city: data.name,
        temperature: Math.round(temperature),
        humidity: data.main.humidity,
        weather: data.weather[0].main,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchAQIData = async (city) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    try {
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        console.error("City not found!");
        return;
      }

      const { lat, lon } = geoData[0];
      const aqiAPI = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const aqiResponse = await fetch(aqiAPI);
      const aqiData = await aqiResponse.json();

      const pm25 = aqiData.list[0].components.pm2_5;
      const aqiCategory = aqiData.list[0].main.aqi;

      const aqiDescriptions = {
        1: "Good",
        2: "Fair",
        3: "Moderate",
        4: "Poor",
        5: "Very Poor",
      };

      setAqiData({
        pm25: pm25.toFixed(1),
        aqiCategory: aqiDescriptions[aqiCategory] || "Unknown",
      });
    } catch (error) {
      console.error("Error fetching AQI data:", error);
    }
  };

  const getCityTime = async (city) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    try {
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        setLocalTime("City not found. Please try again.");
        return;
      }

      const { lat, lon } = geoData[0];
      const timezoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
      const timezoneResponse = await fetch(timezoneUrl);
      const timezoneData = await timezoneResponse.json();

      if (timezoneData.status === "OK") {
        const localTime = timezoneData.formatted.split(" ")[1];
        setLocalTime(localTime);
      } else {
        setLocalTime("Error fetching time.");
      }
    } catch (error) {
      console.error("Error fetching time:", error);
      setLocalTime("An error occurred. Please try again.");
    }
  };

  const handleSearch = () => {
    setCurrentCity(searchQuery);
    setIsLocationTabActive(false);
  };

  const toggleHome = () => setActiveCard("home");
  const toggleTemp = () => setActiveCard("temp");
  const toggleAQI = () => setActiveCard("aqi");
  const toggleTime = () => setActiveCard("time");
  const toggleSettings = () => setActiveCard("settings");

  const toggleLocationTab = () => setIsLocationTabActive(!isLocationTabActive);

  return (
    <div className="container">
      <Sidebar
        toggleHome={toggleHome}
        toggleTemp={toggleTemp}
        toggleAQI={toggleAQI}
        toggleTime={toggleTime}
        toggleSettings={toggleSettings}
        toggleLocationTab={toggleLocationTab}
      />
      <div className="main-content">
        {isLocationTabActive && (
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
            <input
              type="search"
              placeholder="Enter city name"
              spellCheck="false"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        )}

        {activeCard === "home" && weatherData && (
          <WeatherCard
            city={weatherData.city}
            temperature={weatherData.temperature}
            humidity={weatherData.humidity}
            time={localTime}
            aqi={`${aqiData?.pm25} (${aqiData?.aqiCategory})`}
          />
        )}

        {activeCard === "temp" && weatherData && (
          <WeatherCard temperature={weatherData.temperature} isTempCard />
        )}

        {activeCard === "aqi" && aqiData && (
          <WeatherCard
            aqi={`${aqiData.pm25} (${aqiData.aqiCategory})`}
            isAQICard
          />
        )}

        {activeCard === "time" && localTime && (
          <WeatherCard time={localTime} isTimeCard />
        )}
        {activeCard === "settings" && (
          <div>
            <div>Settings Card</div>
            <button onClick={toggleLocationTab}>Go to Location</button>
          </div>
        )}

        {activeCard === "location" && <WeatherCard isLocationCard={true} />}
      </div>
    </div>
  );
};

export default App;

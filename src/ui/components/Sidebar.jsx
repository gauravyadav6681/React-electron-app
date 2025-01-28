import React, { useState, useEffect } from "react";

const Sidebar = ({
  toggleHome,
  toggleTemp,
  toggleAQI,
  toggleTime,
  toggleLocationTab,
}) => {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleSettings = () => {
    setSettingsVisible((prevState) => !prevState);
  };

  const handleCheckboxChange = (e) => {
    setIsDarkMode(e.target.checked);
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={toggleHome}>
          <i className="fas fa-home text-xl"></i>
          <span>Home</span>
        </li>
        <li onClick={toggleTemp}>
          <i
            className="fas fa-thermometer-half text-xl"
            style={{ marginRight: "24px" }}
          ></i>
          <span>Temp</span>
        </li>
        <li onClick={toggleAQI}>
          <i className="fas fa-wind text-xl"></i>
          <span>AQI</span>
        </li>
        <li onClick={toggleTime}>
          <i className="fas fa-clock text-xl"></i>
          <span>Time</span>
        </li>

        <li onClick={toggleSettings}>
          <i className="fas fa-cog text-xl"></i>
          <span>Settings</span>
          <i className="fas fa-chevron-down text-sm"></i>
        </li>

        {isSettingsVisible && (
          <ul id="settings-menu" className="settings-menu">
            {/* Dark Mode Toggle */}
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              checked={isDarkMode}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className="ball"></span>
            </label>

            <li onClick={toggleLocationTab}>
              <i className="fas fa-map-marker-alt text-xl"></i>
              <span>Location</span>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

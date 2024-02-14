import React, { useState } from "react";

const App = () => {
  const [cityValue, setCityValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const api = "";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api}&units=metric`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (error) {
      setWeatherData(null);
      setError("No City was found on the Server");
    }
  };

  return (
    <div className="app" style={{ backgroundColor: "rgb(225, 93, 68)" }}>
      <div className="container">
        <h1>LIVE° Weather</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="city-name"
            placeholder="Enter City"
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            className="city-input"
          />
          <input type="submit" value="Get Weather" className="submit-button" />
        </form>
        <div id="main-div">
          {weatherData && (
            <>
              <div className="icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </div>
              <div
                className="description"
                style={{ color: "rgb(252, 252, 252)" }}
              >
                {weatherData.weather[0].description}
              </div>
              <br />
              <div className="temperature">
                Temperature in Celsius: {weatherData.main.temp} °C
              </div>
              <div className="kelvin">
                Temperature in Kelvin: {weatherData.main.temp + 273.15} k
              </div>
              <div className="fahrenheit">
                Temperature in Fahrenheit:{" "}
                {(weatherData.main.temp * 9) / 5 + 32} °F
              </div>
              <div className="details">
                Humidity is: {weatherData.main.humidity}%
              </div>
            </>
          )}
          {error && (
            <div className="error">
              {error}
              <img
                src="https://cdn-icons-png.flaticon.com/512/5201/5201284.png"
                width="50px"
                height="50px"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

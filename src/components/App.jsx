import React, { useState } from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";

const App = () => {
  // State to hold the input value for the city
  const [cityValue, setCityValue] = useState("berlin");

  // State to hold weather data received from the API
  const [weatherData, setWeatherData] = useState(null);

  // State to hold error messages in case of API request failure
  const [error, setError] = useState("");

  // API key for OpenWeatherMap
  const api = "681676c6a80991562750999f64af1221";

  // API URL constructed with the city input value and the API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api}&units=metric`;

  // Function to handle form submission
  const handleSubmit = async (event) => {
    // To not Refresh
    if (event) {
      event.preventDefault();
    }

    try {
      // Fetch data from the OpenWeatherMap API
      const response = await fetch(apiUrl);

      // Parse the response data as JSON
      const data = await response.json();

      // Update the weather data state with the fetched data
      setWeatherData(data);

      // Clear any previous error messages if exist
      setError("");
    } catch (error) {
      // If there's an error, set weather data to null and display an error message
      setWeatherData(null);
      setError("No City was found");
    }
  };
  useEffect(() => {
    // Call the handleSubmit function when the component mounts
    handleSubmit();
    setCityValue("");
  }, []);
  console.log(weatherData);

  return (
    <>
      <Navbar
        weatherData={weatherData}
        api={api}
        apiUrl={apiUrl}
        handleSubmit={handleSubmit}
        cityValue={cityValue}
        setCityValue={setCityValue}
      />

      <div className="container">
        <h1>LIVE° Weather</h1>

        <div id="main-div">
          {weatherData && (
            <>
              <div className="icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </div>
              <div className="description">
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
        </div>
      </div>
    </>
  );
};

export default App;

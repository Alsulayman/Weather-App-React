import React, { useState } from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import DividerVariants from "./WeatherDisplay";

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

      // Check if the response status is OK
      if (response.ok) {
        // Parse the response data as JSON
        const data = await response.json();

        // Update the weather data state with the fetched data
        setWeatherData(data);

        // Clear any previous error messages if exist
        setError("");
      } else {
        // If the response status is not OK, throw an error
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      // If there's an error, set weather data to null and display an error message
      setWeatherData(null);
      setError("No City was found");
    }
  };

  useEffect(() => {
    // Delay the initial API call by 1000 milliseconds (1 second)
    setTimeout(() => {
      // Call the handleSubmit function after the delay
      handleSubmit();
      // empty the Search field
      setCityValue("");
    }, 3000);

    // Clear the timeout if the component unmounts or useEffect runs again
  }, []);

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
      {/* Conditionally render the error message */}
      {error && <p>Error: {error}</p>}
      <DividerVariants weatherData={weatherData} />
    </>
  );
};

export default App;

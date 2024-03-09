import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

function DividerVariants({ weatherData }) {
  return (
    <>
      {/* Check if weatherData is available */}
      {weatherData ? (
        <List sx={style}>
          <ListItem>
            <Typography variant="h5">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />{" "}
            </Typography>
            <Typography>{weatherData.weather[0].description}</Typography>
          </ListItem>
          <Divider component="li" />
          <ListItem> Celsius: {weatherData.main.temp} °C</ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>Kelvin: {weatherData.main.temp + 273.15} k</ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            Fahrenheit: {(weatherData.main.temp * 9) / 5 + 32} °F
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>Humidity: {weatherData.main.humidity}%</ListItem>
        </List>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </>
  );
}
export default DividerVariants;

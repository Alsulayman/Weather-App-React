import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "cities.json";

export default function ComboBox() {
  // State for filtered cities
  const [filteredCities, setFilteredCities] = useState([]);

  // Handler for filtering cities based on user input
  const handleInputChange = (event, value) => {
    const inputValue = value.trim().toLowerCase();
    // Filter cities based on user input
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(inputValue)
    );
    setFilteredCities(filtered);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={filteredCities}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="City" />}
      onInputChange={handleInputChange}
    />
  );
}

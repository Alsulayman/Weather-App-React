import React from "react";
import { AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar({ weatherData, handleSubmit, cityValue, setCityValue }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "#176B87",
          }}
        >
          <Typography
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            variant="h6"
          >
            {weatherData ? (
              <Typography variant="h6">
                {weatherData.name} {weatherData.sys.country}
              </Typography>
            ) : (
              <Typography variant="h6">Enter a city</Typography>
            )}
          </Typography>
          <Search>
            <form onSubmit={handleSubmit}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={cityValue}
                onChange={(e) => setCityValue(e.target.value)}
              />
            </form>
          </Search>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;

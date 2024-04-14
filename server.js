const express = require("express");
require("dotenv").config();
const weatherRoutes = require("./routes/weatherRoutes");
const mapboxRoutes = require("./routes/mapboxRoutes");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = 3000;

const address = process.argv[2];
if (!address) {
  return console.error("Please provide an address");
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log("Geocode Data:", { latitude, longitude, location });
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.error("Error:", error);
      }
      // Display the forecast (description, temperature, location, and percentage of rain chance)
      console.log(location);
      console.log(
        `${forecastData.description}. It is currently ${forecastData.temperature} degrees out. There is a ${forecastData.precipitation}% chance of rain.`
      );
    });
  });
}

app.use("/weather", weatherRoutes);
app.use("/location", mapboxRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

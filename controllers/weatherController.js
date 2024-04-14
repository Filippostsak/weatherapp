const { fetchLocation } = require("../services/mapbox");
const { fetchWeather } = require("../services/weather");
const geocode = require("../utils/geocode");

async function getWeatherByCity(req, res) {
  const city = req.params.city;
  try {
    const locationInfo = await fetchLocation(city);
    const weatherInfo = await fetchWeather(
      locationInfo.latitude,
      locationInfo.longitude
    );
    res.json({
      description: `${weatherInfo.description} It is currently ${weatherInfo.temperature}°C degrees out. There is a ${weatherInfo.precipitation}% chance of rain.`,
      location: locationInfo,
      weather: weatherInfo,
    });
  } catch (error) {
    console.error("Error during API calls:", error);
    res
      .status(500)
      .send({ error: "Failed to fetch data, please try again later." });
  }
}

async function getWeatherByAddress(req, res) {
  const address = req.params.address;
  geocode(address, async (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.error("Geocoding error:", error);
      return res
        .status(404)
        .send({ error: "Geocoding failed, check the address provided." });
    }
    try {
      const weatherInfo = await fetchWeather(latitude, longitude);
      res.json({
        description: `${weatherInfo.description} It is currently ${weatherInfo.temperature}°C degrees out. There is a ${weatherInfo.precipitation}% chance of rain.`,
        location: location,
        weather: weatherInfo,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).send({ error: "Failed to fetch weather data." });
    }
  });
}

module.exports = { getWeatherByCity, getWeatherByAddress };

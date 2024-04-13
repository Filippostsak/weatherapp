const express = require("express");
const request = require("postman-request");

const app = express();
const port = 3000;

require("dotenv").config();

const url =
  process.env.WEATHER_API_URL +
  process.env.WEATHER_API_KEY +
  "/37.8267,-122.4233";

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service");
  } else if (response.body.error) {
    console.log("Unable to find location");
  } else {
    console.log(
      response.body.current.weather_descriptions[0] +
        ". It is currently " +
        response.body.current.temperature +
        " degrees out. There is a " +
        response.body.current.precip +
        "% chance of rain."
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

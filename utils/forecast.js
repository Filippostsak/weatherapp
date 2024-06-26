const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;
      callback(undefined, {
        description: data.weather_descriptions[0],
        temperature: data.temperature,
        precipitation: data.precip,
      });
    }
  });
};

module.exports = forecast;

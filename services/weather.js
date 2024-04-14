const request = require("postman-request");

const requestPromise = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      } else if (response.body.error) {
        reject(new Error("API returned an error: " + response.body.error.info));
      } else {
        resolve(response);
      }
    });
  });
};

// Asynchronous function to fetch weather api
const fetchWeather = async (latitude, longitude) => {
  const url = `${process.env.WEATHER_API_URL}${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;
  try {
    const response = await requestPromise({ url, json: true });
    return {
      description: response.body.current.weather_descriptions[0],
      temperature: response.body.current.temperature,
      precipitation: response.body.current.precip,
    };
  } catch (error) {
    throw new Error("Error fetching weather: " + error.message);
  }
};

module.exports = { fetchWeather };

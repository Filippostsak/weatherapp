const request = require("postman-request");

const requestPromise = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      } else if (
        response.body.features &&
        response.body.features.length === 0
      ) {
        reject(new Error("Location not found"));
      } else {
        resolve(response);
      }
    });
  });
};

// Function to fetch geolocation information
const fetchLocation = async (locationName) => {
  const url = `${process.env.MAPBOX_URL}${encodeURIComponent(
    locationName
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1&language=en`;
  try {
    const response = await requestPromise({ url, json: true });
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    return {
      latitude: latitude,
      longitude: longitude,
    };
  } catch (error) {
    throw new Error("Error fetching location: " + error.message);
  }
};

module.exports = { fetchLocation };

const { fetchLocation } = require("../services/mapbox");

async function getLocationByCity(req, res) {
  const city = req.params.city;
  try {
    const locationInfo = await fetchLocation(city);
    res.json(locationInfo);
  } catch (error) {
    console.error("Error fetching location:", error);
    res
      .status(500)
      .send({
        error: "Failed to fetch location data, please try again later.",
      });
  }
}

module.exports = { getLocationByCity };

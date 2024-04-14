const express = require("express");
const router = express.Router();
const {
  getWeatherByCity,
  getWeatherByAddress,
} = require("../controllers/weatherController");

router.get("/city/:city", getWeatherByCity);
router.get("/address/:address", getWeatherByAddress);

module.exports = router;

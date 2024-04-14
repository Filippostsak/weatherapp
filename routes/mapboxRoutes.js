const express = require("express");
const router = express.Router();
const { getLocationByCity } = require("../controllers/mapboxController");

router.get("/:city", getLocationByCity);

module.exports = router;

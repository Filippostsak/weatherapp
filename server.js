const express = require("express");
require("dotenv").config();
const weatherRoutes = require("./routes/weatherRoutes");
const mapboxRoutes = require("./routes/mapboxRoutes");
const app = express();
const port = 3000;

app.use("/weather", weatherRoutes);
app.use("/location", mapboxRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

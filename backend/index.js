// NPM modules
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Local modules
const galleryRoute = require("./routes/galleryRoute");

const app = express();
dotenv.config();
const port = 8000;

mongoose.connect("mongodb://localhost/ky");

app.use(cors());
app.use(express.json());

app.use(galleryRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

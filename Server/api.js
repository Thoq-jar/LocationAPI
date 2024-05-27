const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client", "index.html"));
});

app.post("/send-location", (req, res) => {
  console.log("Received a POST request to /send-location");
  const location = req.body.location;
  console.log("Received location:", location);

  res.setHeader("Content-Type", "application/json");
  res.json({
    message: "Location received successfully!",
    latitude: location.latitude,
    longitude: location.longitude,
  })
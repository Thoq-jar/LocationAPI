const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require('https');

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
  });
});

app.get("/display-location", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client", "display_location.html"));
});

const serverOptions = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
};

const server = https.createServer(serverOptions, app);
server.listen(port, () => {
  console.log(`Server is listening at https://pi.local:${port}`);
});

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  server.close(() => {
    console.log("Server has been shut down.");
    process.exit(0);
  });
});


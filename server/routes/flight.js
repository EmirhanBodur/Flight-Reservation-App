// flights.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Schiphol API URL ve anahtar
const flightApiUrl = "https://api.schiphol.nl/public-flights/flights";
const appKey = "abef1c2c"; // Kendi API anahtarınızı ekleyin
const appId = "08489e7a08c729258ce95e7c1663aa6e"; // Kendi App ID'nizi ekleyin

// Uçuşları almak için endpoint
router.get("/", async (req, res) => {
  const { direction, flightdate } = req.query;

  try {
    // API isteği yap
    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: appId,
        app_key: appKey,
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightdate,
        flightDirection: direction,
      },
    });

    // Uçuş verilerini yanıt olarak gönder
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error.message);
    res.status(500).send("Error fetching flight data");
  }
});

// eslint-disable-next-line no-undef
module.exports = router;

// eslint-disable-next-line no-undef
const FlightModel = require("../models/flightModel.js"); // flight.js'i flightModel olarak değiştirdim
// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const axios = require("axios");
const router = express.Router();

// Schiphol API URL ve anahtar
const flightApiUrl = "https://api.schiphol.nl/public-flights/flights";
const apiId = "abef1c2c"; // appId'yi apiId olarak değiştirdim
const apiKey = "08489e7a08c729258ce95e7c1663aa6e"; // appKey'i apiKey olarak değiştirdim

// Uçuşları almak için endpoint
router.get("/", async (req, res) => {
  try {
    const { flightDirection, flightDate } = req.query; // direction yerine flightDirection, flightdate yerine flightDate olarak değiştirdim
    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: apiId, // Değiştirilen apiId kullanıldı
        app_key: apiKey, // Değiştirilen apiKey kullanıldı
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightDate, // flightdate yerine flightDate kullanıldı
        flightDirection, // direction yerine flightDirection kullanıldı
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(500).send("Error fetching flight data");
  }
});

// Yeni bir uçuş eklemek için endpoint
router.post("/add", async (req, res) => {
  try {
    const newFlight = new FlightModel(req.body); // newFlight verisi FlightModel'a kaydediliyor
    await newFlight.save();
    res.status(200).json("Flight added successfully!");
  } catch (error) {
    console.error("Error saving flight:", error);
    res
      .status(500)
      .json({ message: "Error adding flight", error: error.message });
  }
});

// MongoDB veritabanından tüm uçuşları almak için endpoint
router.get("/getAll", async (req, res) => {
  try {
    const allFlights = await FlightModel.find(); // Tüm uçuşları getirirken değişken ismini allFlights yaptım
    res.status(200).json(allFlights);
  } catch (error) {
    console.error("Error fetching flight data from MongoDB:", error);
    res.status(500).json({
      message: "Error fetching flight data from MongoDB",
      error: error.message,
    });
  }
});

// Uçuşları silmek için endpoint
router.delete("/delete", async (req, res) => {
  try {
    const { flightId } = req.body; // flightId body'den alınıyor

    // Uçuşun olup olmadığını kontrol ediyoruz
    const flightToDelete = await FlightModel.findById(flightId); // findById doğrudan flightId ile arama yapar
    if (!flightToDelete) {
      return res.status(404).json({ message: "Flight not found." });
    }

    // Uçuşu silme işlemi
    await FlightModel.findByIdAndDelete(flightId);
    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    console.error("Error deleting flight:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting flight", error: error.message });
  }
});

// Router'ı dışa aktarıyoruz
module.exports = router;

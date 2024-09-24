const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  flightName: { type: String, required: true },
  route: { type: String, required: true }, // Route alanı
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;

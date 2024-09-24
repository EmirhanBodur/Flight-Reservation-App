const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

// Route'lar
const flightRoutes = require("./routes/flightRoutes.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://emirhanbdr52:s26Lk39BSx3Yc9VE@cluster0.01cil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Route'ları tanımlama
app.use("/api/flights", flightRoutes);

// Sunucuyu başlatma
app.listen(port, () => {
  connectToDatabase();
  console.log(`Server is running on port ${port}`);
});

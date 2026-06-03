
console.log("SERVER FILE STARTED");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2007;

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 Debug route loading
let reviewRoutes, tailorRoutes, userRoutes, custProfileRoutes;

try {
  console.log("Loading reviewRoutes...");
  reviewRoutes = require("./routes/reviewRoutes");

  console.log("Loading tailorRoutes...");
  tailorRoutes = require("./routes/tailor");

  console.log("Loading userRoutes...");
  userRoutes = require("./routes/user");

  console.log("Loading customerProfile routes...");
  custProfileRoutes = require("./routes/customerProfile");

  console.log("✅ All route files loaded successfully");
} catch (err) {
  console.error("❌ Error while loading routes:", err);
  process.exit(1);
}

// Routes
app.use("/api", reviewRoutes);
app.use("/tailor", tailorRoutes);
app.use("/user", userRoutes);
app.use("/custprofile", custProfileRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API working");
});

// ✅ MongoDB connection + server start
console.log("MONGO_URI EXISTS:", !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err);
  });

module.exports = app;


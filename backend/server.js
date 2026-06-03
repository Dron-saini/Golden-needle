// console.log("SERVER FILE STARTED");

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();
// const PORT = process.env.PORT || 2007;
// // Middleware
// app.use(cors());
// app.use(express.json());

// // 🔍 Debug route loading
// let reviewRoutes, tailorRoutes, userRoutes, custProfileRoutes;

// try {
//   console.log("Loading reviewRoutes...");
//   reviewRoutes = require("./routes/reviewRoutes");

//   console.log("Loading tailorRoutes...");
//   tailorRoutes = require("./routes/tailor");

//   console.log("Loading userRoutes...");
//   userRoutes = require("./routes/user");

//   console.log("Loading customerProfile routes...");
//   custProfileRoutes = require("./routes/customerProfile");

//   console.log("✅ All route files loaded successfully");
// } catch (err) {
//   console.error("❌ Error while loading routes:", err);
//   process.exit(1); // stop server immediately
// }

// // Routes (only if loaded successfully)
// app.use("/api", reviewRoutes);
// app.use("/tailor", tailorRoutes);
// app.use("/user", userRoutes);
// app.use("/custprofile", custProfileRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API working");
// });

// // MongoDB + Server start
// mongoose
//   .connect("mongodb://127.0.0.1:27017/tailorapp")
//   .then(() => {
//     console.log("✅ MongoDB connected");

//     const PORT = process.env.PORT || 2007;

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });
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
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------
// Middleware
// ----------------------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // Parse JSON bodies

// ----------------------
// Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ----------------------
// MongoDB Connection
// ----------------------
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true, // Only for development on Windows to bypass SSL errors
};

mongoose.connect(process.env.MONGO_URI, mongoOptions)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

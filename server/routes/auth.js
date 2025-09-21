const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Make sure you have a User model

// ----------------------
// REGISTER
// ----------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || "", // optional
    });

    const savedUser = await newUser.save();

    // Return user data (without password)
    const { password: pw, ...userData } = savedUser._doc;
    res.status(201).json(userData);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ----------------------
// LOGIN
// ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Return user data (without password)
    const { password: pw, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

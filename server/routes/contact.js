const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    console.log("Received contact form:", req.body); // debug

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const savedContact = await new Contact({ name, email, message }).save();
    res.json({ msg: 'Message received', id: savedContact._id });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

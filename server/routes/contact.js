const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
// optional: nodemailer if you want to send email

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ msg: 'All fields required' });

    const saved = await new Contact({ name, email, message }).save();

    // OPTIONAL: send email using nodemailer (configure env EMAIL_USER/PASS)
    // const nodemailer = require('nodemailer');
    // ... send email logic ...

    res.json({ msg: 'Message received', id: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

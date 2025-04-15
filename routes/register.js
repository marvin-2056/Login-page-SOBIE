const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { fullname, email, event } = req.body;
  const selectedEvent = event && event.trim() !== "" ? event : "General Admission";

  try {
    // Save to MongoDB
    const reg = new Registration({ fullname, email, event: selectedEvent });
    await reg.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Event Registration Confirmation',
      text: `Hello ${fullname},\n\nYou are registered for: ${selectedEvent}.`
    };

    await transporter.sendMail(mailOptions);

    // Clean redirect — no name/email in URL
    res.redirect('/confirm.html');
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

module.exports = router;

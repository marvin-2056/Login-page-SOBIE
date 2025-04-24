const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { fullname, email, event, student, firstTime, school } = req.body;
  const selectedEvent = event && event.trim() !== "" ? event : "General Admission";

  try {
    const reg = new Registration({
      fullname,
      email,
      event: selectedEvent,
      student,
      firstTime,
      school
    });

    await reg.save();

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
      text: `Hello ${fullname},\n\nYou are registered for: ${selectedEvent}.\n\nThank you for registering!`,
    };

    await transporter.sendMail(mailOptions);
    res.redirect('/confirm.html');
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

module.exports = router;

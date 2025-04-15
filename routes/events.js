const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.post('/', async (req, res) => {
  const { email, name } = req.body;

  try {
    const query = { email };
    if (name) query.fullname = name;

    const registrations = await Registration.find(query);
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve events.' });
  }
});

module.exports = router;

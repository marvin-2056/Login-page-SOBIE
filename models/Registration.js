const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  event: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);

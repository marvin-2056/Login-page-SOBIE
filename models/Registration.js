const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  student: { type: String, required: true },
  firstTime: { type: String, required: true },
  school: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);

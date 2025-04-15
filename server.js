const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch((err) => console.error('MongoDB Connection Error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/register', require('./routes/register'));
app.use('/api/my-events', require('./routes/events'));

app.listen(3000, () => console.log('Server started on http://localhost:3000'));

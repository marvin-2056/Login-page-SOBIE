const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);

const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/user', require('./routes/user'));

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/profile.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

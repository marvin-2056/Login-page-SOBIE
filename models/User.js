const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    school: String,
    bio: String,
    profilePic: String,
    bannerImage: String
});

module.exports = mongoose.model('User', userSchema);
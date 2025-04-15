const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/update-profile', upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const userId = req.session.userId;
        const updateData = {
            username: req.body.username,
            email: req.body.email,
            school: req.body.school,
            bio: req.body.bio
        };
        if (req.files.profilePic) updateData.profilePic = req.files.profilePic[0].filename;
        if (req.files.bannerImage) updateData.bannerImage = req.files.bannerImage[0].filename;
        await User.findByIdAndUpdate(userId, updateData);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Failed to update profile." });
    }
});

module.exports = router;
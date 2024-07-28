const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

require("dotenv").config();
const { PORT } = process.env;

// Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
});

router.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: true,
        image_url: `https://e-commerce-a9wp.onrender.com/upload/images/${req.file.filename}`
    })
});

module.exports = router;
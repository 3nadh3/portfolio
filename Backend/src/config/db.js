const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch(err => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;

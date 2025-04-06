// routes/home.js
const express = require("express");
const path = require("path");
const router = express.Router();

// Serve the home page
router.get("/", (req, res) => {
    console.log("Home route handler triggered");
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
});

module.exports = router;

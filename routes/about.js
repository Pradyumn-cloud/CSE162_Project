const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("about route handler triggered");
    res.sendFile(path.join(__dirname, "../public/about.html"));
});

module.exports = router;

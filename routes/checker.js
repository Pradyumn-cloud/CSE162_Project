// routes/checker.js
const express = require("express");
const path = require("path");
const router = express.Router();

// Rabin-Karp algorithm parameters
const d = 256;
const q = 101;

// Rabin-Karp algorithm for pattern searching
const rabinKarp = (text, pattern) => {
    const m = pattern.length;
    const n = text.length;
    let h = 1;
    let p = 0, t = 0, matches = 0;

    // Compute h = d^(m-1) % q (avoiding Math.pow for efficiency)
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate initial hash values
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    // Slide pattern over text
    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            if (text.slice(i, i + m) === pattern) matches++;
        }

        // Compute hash for next window
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t += q;
        }
    }

    return matches;
};

// Improved similarity calculation
const calculateSimilarity = (text1, text2) => {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));

    let totalMatches = 0;
    let totalWords = words1.size + words2.size;

    words1.forEach(word => {
        if (words2.has(word)) totalMatches++;
    });

    return ((totalMatches / totalWords) * 100).toFixed(2);
};

// Serve the plagiarism checker page
router.get("/", (req, res) => {
    console.log("Checker route handler triggered");
    res.sendFile(path.join(__dirname, "../public/index.html")); // Update this to your actual checker HTML file name
});

// Handle plagiarism comparison
router.post("/compare", (req, res) => {
    const { text1, text2 } = req.body;

    if (!text1 || !text2) {
        return res.status(400).send("Both text fields are required.");
    }

    let similarity = 0;
    if (text1 === text2) {
        similarity = 100.00;
    } else {
        similarity = Math.max(calculateSimilarity(text1, text2), calculateSimilarity(text2, text1));
    }

    // Render the results.ejs template with the data
    res.render("results", {
        similarity: similarity,
        text1: text1,
        text2: text2,
        message: `The texts show a similarity of ${similarity}%.`
    });
});

module.exports = router;
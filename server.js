// server.js - Main application file
const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import Routes
const homeRoutes = require("./routes/home");
const checkerRoutes = require("./routes/checker");
const aboutRouter = require("./routes/about");

// Mount routes before static middleware to ensure routes take precedence
app.use("/checker", checkerRoutes);
app.use("/", homeRoutes);
app.use("/about",aboutRouter);

// Static file serving - after routes to prevent conflicts
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
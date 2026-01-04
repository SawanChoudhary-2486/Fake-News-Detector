// server.js
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route (health check)
app.get("/", (req, res) => {
  res.json({
    status: "Backend is running 🚀",
    message: "Truth Dao API is alive"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌑 Server running on http://localhost:${PORT}`);
});

// Security headers
app.use(helmet());

// Rate limiting (anti abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
});

app.use(limiter);

// Routes
app.use("/api/analyze", require("./routes/analyze.routes"));

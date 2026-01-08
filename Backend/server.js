// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const app = express();

// 🔗 Connect to MongoDB FIRST
connectDB();

// ====== Global Middlewares ======
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limiting (anti-abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// ====== Routes ======
app.get("/", (req, res) => {
  res.json({
    status: "Backend is running 🚀",
    message: "Truth Dao API is alive"
  });
});

app.use("/api/analyze", require("./routes/analyze.routes"));

// ====== Start Server LAST ======
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌑 Server running on http://localhost:${PORT}`);
});

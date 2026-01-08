const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["REAL", "FAKE"],
    required: true
  },
  accuracy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Analysis", AnalysisSchema);

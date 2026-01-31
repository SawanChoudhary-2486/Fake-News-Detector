const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },

  // Raw ML output (internal use only)
  modelLabel: {
    type: String,
    enum: ["REAL", "FAKE"],
    required: true
  },

  // Model confidence for this prediction
  confidence: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Analysis", AnalysisSchema);

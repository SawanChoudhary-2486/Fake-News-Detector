const Analysis = require("../models/Analysis");
const { getPredictionFromML } = require("../services/ml.service");

exports.analyzeNews = async (req, res) => {
  try {
    const { url } = req.body;

    // 🔮 Call Python ML service
    const result = await getPredictionFromML(url);
    // Expected: result.label (REAL/FAKE), result.confidence (0–1)

    // 🧠 Convert hard labels to soft
    let credibility;

    if (result.confidence < 0.75) {
      credibility = "Needs Verification";
    } else if (result.label === "REAL") {
      credibility = "Likely Reliable";
    } else {
      credibility = "Potentially Unreliable";
    }

    // 💾 Save INTERNAL values only (not UI wording)
    const savedAnalysis = await Analysis.create({
      url,
      modelLabel: result.label,
      confidence: result.confidence
    });

    // 🌐 Send SAFE response to frontend
    return res.json({
      success: true,
      data: {
        id: savedAnalysis._id,
        url,
        credibility,
        confidence: result.confidence
      }
    });

  } catch (error) {
    console.error("ML or DB error:", error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.detail || error.message
    });
  }
};

const Analysis = require("../models/Analysis");
const { getPredictionFromML } = require("../services/ml.service");

exports.analyzeNews = async (req, res) => {
  try {
    const { url } = req.body;

    // 🔮 Call Python ML service
    const result = await getPredictionFromML(url);

    // 💾 Save result to MongoDB
    const savedAnalysis = await Analysis.create({
      url,
      status: result.status,
      accuracy: result.accuracy
    });

    return res.json({
      success: true,
      data: {
        id: savedAnalysis._id,
        url,
        status: result.status,
        accuracy: result.accuracy
      }
    });

  } catch (error) {
    console.error("ML or DB error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to analyze news"
    });
  }
};

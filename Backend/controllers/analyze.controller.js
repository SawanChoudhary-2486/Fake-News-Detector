const Analysis = require("../models/Analysis");

exports.analyzeNews = async (req, res) => {
  try {
    const { url } = req.body;

    // Temporary dummy result (ML comes later)
    const result = {
      status: "REAL",
      accuracy: "92.5%"
    };

    // Save to MongoDB
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to save analysis"
    });
  }
};

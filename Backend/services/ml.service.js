const axios = require("axios");

const ML_SERVICE_URL = "http://localhost:8000/predict";

exports.getPredictionFromML = async (url) => {
  const response = await axios.post(ML_SERVICE_URL, { url });

  return {
    label: response.data.label,        // REAL / FAKE
    confidence: response.data.confidence // Number (0–1)
  };
};

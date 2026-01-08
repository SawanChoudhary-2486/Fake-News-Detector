const axios = require("axios");

const ML_SERVICE_URL = "http://localhost:8000/predict";

exports.getPredictionFromML = async (url) => {
  const response = await axios.post(ML_SERVICE_URL, { url });

  return {
    status: response.data.label,
    accuracy: `${(response.data.confidence * 100).toFixed(2)}%`
  };
};

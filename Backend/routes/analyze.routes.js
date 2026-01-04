const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const { analyzeNews } = require("../controllers/analyze.controller");

// POST /api/analyze
router.post(
  "/",
  [
    body("url")
      .trim()
      .notEmpty().withMessage("URL is required")
      .isURL().withMessage("Invalid URL format")
  ],
  validate,
  analyzeNews
);

module.exports = router;

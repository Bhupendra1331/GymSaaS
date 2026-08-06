const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

/**
 * Security Middleware
 */
app.use(helmet());

/**
 * Enable CORS
 */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/**
 * Request Logging
 */
app.use(morgan("dev"));

/**
 * Parse JSON Request Body
 */
app.use(express.json({ limit: "10mb" }));

/**
 * Parse Form Data
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Parse Cookies
 */
app.use(cookieParser());

/**
 * Health Check API
 */
app.get("/api/v1/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "GymSaaS Backend is running successfully.",
    version: "v1",
    timestamp: new Date(),
  });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
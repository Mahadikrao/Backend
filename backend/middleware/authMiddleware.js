// authMiddleware.js
const jwt = require("jsonwebtoken");

// Secret key for JWT token signing
const JWT_secretKey = "your_secret_key"; // Replace with your secret key

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get token from request headers
  const token = req.headers["authorization"];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_secretKey);
    // Attach user information to request object for further processing
    req.user = decoded;
    next(); // Call next middleware
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;

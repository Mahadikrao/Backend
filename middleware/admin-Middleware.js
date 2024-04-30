const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_secretKey = "your_secret_key";

async function adminMiddleware(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user doesn't exist, return an error
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access forbidden. User is not an admin" });
    }

    // If authentication is successful and user is an admin, generate a JWT token
    const token = generateToken(user);

    // Send the token along with the success message
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

function generateToken(user) {
  try {
    // Generate JWT token with user's ID and username as payload
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_secretKey,
      { expiresIn: "1d" }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
  }
}

module.exports = adminMiddleware;

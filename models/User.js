const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const JWT_secreateKey = "kailash";
// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
});
// json  web token
// userSchema.methods.generateToken = function () {
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email,
//         username: this.username,
//       },
//       JWT_secreateKey,
//       {
//         expiresIn: "1d",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;

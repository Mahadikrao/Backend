const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://shauryarao05:0sLIOR4sq1WV5EB7@cluster0.tdua1bx.mongodb.net/";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Atlas Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  }
}

connectToDatabase();

module.exports = mongoose;

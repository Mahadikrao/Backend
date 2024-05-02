const express = require("express");
const mongoose = require("./Database/Db");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Course = require("./models/Course");

const cors = require("cors");
const authController = require("./controller/authController");
const verifyToken = require("./middleware/authMiddleware");
const signupController = require("./controller/signup_controller");
const adminMiddleware = require("./middleware/admin-Middleware");

const app = express();
const router = express.Router(); // Create a router instance

const port = 800;

app.use(cors());
app.use(express.json());

// Assuming you've already defined the Course model and imported it

app.post("/courses", async (req, res) => {
  try {
    const { title, description, instructor, price, duration, imageUrl } =
      req.body;

    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      duration,
      imageUrl,
    });

    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/courses", verifyToken, async (req, res) => {
  try {
    // Retrieve all courses from the database
    const courses = await Course.find();

    // Send the list of courses as a response
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define routes using the router
router.post("/login", authController.login);

router.post("/admin-route", adminMiddleware, (req, res) => {
  // This code will only execute if the user is an admin
  res.status(200).json({ message: "Admin route accessed successfully" });
});

router.post("/signup", signupController.signup);
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Access to protected route granted", user: req.user });
});

// Mount the router on the app
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});

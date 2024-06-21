const express = require("express");
const { Admin, Course } = require("../db/index");
const AdminMiddleWares = require("../Middlewares/admin");
const router = express.Router();

// sign up for admin
router.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  let admin1 = new Admin({
    username: username,
    password: password,
  });
  let admin = await admin1.save();
  console.log(admin);
  res.json({
    message: "Admin created succesfully",
  });
});

// add courses
router.post("/course", AdminMiddleWares, async (req, res) => {
  let { title, Price, description, Duration, imageLink } = req.body;
  let addCourse = await Course.create({
    title,
    Price,
    description,
    Duration,
    imageLink,
  });
  res.json({
    message: "Course added succesfully",
    courseId: addCourse._id,
  });
});

// show courses

router.get("/courses", AdminMiddleWares, async (req, res) => {
  let allCourses = await Course.find({});
  res.json({
    allCourses,
  });
});

module.exports = router;

const express = require("express");
const { User, Course } = require("../db/index");
const { Schema } = require("mongoose");
const UserMiddleWares = require("../Middlewares/user.js");
const router = express.Router();

// sign up for users
router.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  let newUser = new User({
    username,
    password,
  });
  let ans = await newUser.save();
  res.json({
    ans,
  });
});

router.get("/course", async (req, res) => {
  let allCourses = await Course.find({});
  console.log(allCourses);
  res.json({
    allCourses,
  });
});

router.post("/course/:courseId", UserMiddleWares, async (req, res) => {
  let courseId = req.params.courseId;
  let username = req.headers.username;
  // little bit tricky
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourse: courseId,
      },
    },
  );
  res.json({
    message: "Purschase-Completed",
  });
});

router.get("/purchasedCourse", UserMiddleWares, async (req, res) => {
  let username = req.headers.username;
  let User1 = await User.findOne({
    username: username,
  });
  const courses = await Course.find({
    _id: {
      $in: User1.purchasedCourse,
    },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;

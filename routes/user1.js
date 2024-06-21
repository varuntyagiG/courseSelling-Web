const express = require("express");
const { User, Course } = require("../db/index");
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

module.exports = router;

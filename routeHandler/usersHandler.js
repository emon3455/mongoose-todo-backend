const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const router = express.Router();

const User = new mongoose.model("User", userSchema);

// register
router.post("/register", async (req, res) => {
  const newuser = new User({
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password
  });
  try {
    await newuser.save();
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a Server Side Error",
    });
  }
});


module.exports = router;

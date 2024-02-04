const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = require("../schemas/userSchema");
const router = express.Router();

const User = new mongoose.model("User", userSchema);

// signup
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newuser = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hashedPassword,
    });
    await newuser.save();
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (err) {
    // Check if the error is due to a duplicate key violation
    if (err.code === 11000 && err.keyPattern && err.keyPattern.userName) {
      // Duplicate username error
      res.status(400).json({
        error: "Username already exists. Please choose a different one.",
      });
    } else {
      // Other errors
      res.status(500).json({
        error: "Signup Failed..!",
      });
    }
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ userName: req.body.userName });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // generate a token and send to the user
        res.status(200).json({
          message: "User Created Successfully",
        });
      } else {
        res.status(500).json({
          error: "Login Failed..!",
        });
      }
    } else {
      res.status(500).json({
        error: "Login Failed..!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error..!",
    });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const userSchema = require("../schemas/userSchema");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);

// get all todos
router.get("/", checkLogin, async (req, res) => {
  try {
    // const data = await Todo.find({status:req.query.status}).select({date:0}).limit(10)
    const data = await Todo.find().populate("user","name userName -_id");
    res.status(200).json({
      message: "Success",
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// --------by using instance method:---------

// get all active todos by using instance methods
router.get("/active", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive('active');
    res.status(200).json({
      message: "Success",
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error..!!!",
    });
  }
});

// get all active todos by using static methods
router.get("/inactive", async (req, res) => {
  try {
    const data = await Todo.findInActive('inactive');
    res.status(200).json({
      message: "Success",
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error..!!!",
    });
  }
});

// get all todos by using title via query helpers
router.get("/title", async (req, res) => {
  try {
    const data = await Todo.find().byTitle(req.query.title).exec();
    res.status(200).json({
      message: "Success",
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error..!!!",
    });
  }
});



// get single todo  by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findOne({_id:req.params.id});
    res.status(200).json({
      message: "Success",
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// post a todos
router.post("/", checkLogin, async (req, res) => {
  const data ={
    ...req.body,
    user: req.userId
  }
  const newTodo = new Todo(data);
  await User.updateOne({
    _id:req.userId
  },
  {
    $push:{
      todo: newTodo._id
    }
  })
  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo Was Inserted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a Server Side Error",
    });
  }
});

// post multiple todos
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos Were Inserted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a Server Side Error",
    });
  }
});

// delete a todos
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({_id: req.params.id});
    res.status(200).json({
      message: "Todos Was Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "There was a Server Side Error",
      error: err
    });
  }
});

// -------update a todos
router.put("/:id", async (req, res) => {
  try {
    const response = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Todos Was Updatedd Successfully",
      result: response,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "There was a Server Side Error",
    });
  }
});
// router.put("/:id", async (req, res) => {
//   try {
//     await Todo.updateOne({ _id: req.params.id },{$set:req.body});
//     res.status(200).json({
//       message: "Todos Was Updatedd Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "There was a Server Side Error",
//     });
//   }
// });


module.exports = router;

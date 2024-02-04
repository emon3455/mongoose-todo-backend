const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const router = express.Router();

const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get("/", async (req, res) => {
  try {
    // const data = await Todo.find({status:req.query.status}).select({date:0}).limit(10)
    const data = await Todo.find();
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
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
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

const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const router = express.Router();

const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get("/", async (req, res) => {

});

// get single todo  by id
router.get("/:id", async (req, res) => {});

// post a todos
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo Was Inserted Successfully",
    });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({
      error: "There was a Server Side Error",
    });
  }
});

// delete a todos
router.delete("/", async (req, res) => {});

// update a todos
router.put("/", async (req, res) => {});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// express app initialization:
const app = express();

// middle ware
app.use(express.json());
app.use(cors());

// database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zyyhzcl.mongodb.net/todoDB?retryWrites=true&w=majority`;
const options = {
};

// connection
const DBConnection = module.exports =()=>{
  try{
    mongoose.connect(uri, options)
    console.log("Connection Successfull");
  }
  catch(err){
    console.log(err);
  }
}
DBConnection();

// --------all routes---------
const todoHandler = require("./routeHandler/todosHandler");
app.use("/todo", todoHandler);


app.get("/", async (req, res) => {
  res.send("Todo App running....");
});

// basic error handeling
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("app listening at port 3000");
});

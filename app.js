// install and require express and cors
const express = require("express");
const cors = require("cors");
require("./config/database"); // require databse
const todoRoute = require("./routes/todo.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", todoRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h2>This is server home page</h2>");
});

// error handling for 404 Not Found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// genarel error handeling middleware
app.use((err, req, res, next) => {
  res.status(err.status) || 500;
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

module.exports = app;

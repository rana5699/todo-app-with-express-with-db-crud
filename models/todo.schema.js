const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = todoSchema;

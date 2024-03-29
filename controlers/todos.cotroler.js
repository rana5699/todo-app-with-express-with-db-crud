const mongoose = require("mongoose");
const todoSchema = require("../models/todo.schema");
const TodoModel = mongoose.model("Todo", todoSchema);

// gett all todos get method
const getAllTodos = async (req, res) => {
  try {
    const totalTodod = await TodoModel.countDocuments();

    if (totalTodod > 0) {
      const allTodos = await TodoModel.find().select({
        _id: 0,
        createAt: 0,
        __v: 0,
      });

      res.status(200).json({
        message: "get all todos",
        totalTodod,
        allTodos,
      });
    } else {
      res.status(404).json({
        message: "Not avilable any todo",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// gett getOneTodo by ID get method
const getOneTodo = async (req, res) => {
  try {
    const singleTodo = await TodoModel.find({ _id: req.params.id });

    if (singleTodo) {
      res.status(200).json({
        message: "Single todo",
        singleTodo,
      });
    } else {
      res.status(404).json({
        message: "404 NOT FOUND !",
        singleTodo,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TODO BY STATUSS
const getByStatus = async (req, res) => {
  try {
    const total = await TodoModel.find({
      status: req.params.status,
    }).countDocuments();

    if (total > 0) {
      const todoStatus = req.params.status;
      const status = await TodoModel.find({ status: todoStatus }).select({
        _id: 0,
        __v: 0,
        createAt: 0,
      });
      res.status(200).json({
        sucsses: true,
        message: `Found By ${todoStatus} Status`,
        total,
        status,
      });
    } else {
      res.status(404).json({
        sucsses: false,
        message: "404  NOT FOUND !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createNewTodo post method
const createOneNewTodo = async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);

    if (newTodo) {
      await newTodo.save();
      res.status(200).send({
        message: "Create Todo Sucsses",
      });
    } else {
      res.status(200).send({
        message: "Create Todo unsucsses",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createNewTodo post method
const createManyNewTodo = async (req, res) => {
  try {
    const newTodos = await TodoModel.insertMany(req.body);

    if (newTodos) {
      res.status(200).send({
        message: "Create many Todo Success",
        newTodos: newTodos, // Sending back the newly created todos if needed
      });
    } else {
      res.status(200).send({
        message: "Create many Todo unsuccessful",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete todo  DELETE method
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deleteOneTodo = await TodoModel.findOneAndDelete({ _id: todoId });

    if (deleteOneTodo) {
      res.status(200).json({
        message: " todo delte is sucsses",
        deleteOneTodo,
      });
    } else {
      res.status(404).json({
        message: " 404 NOT FOUND !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMany = async (req, res) => {
  try {
    const deleteTodos = await TodoModel.deleteMany({
      status: req.params.status,
    });

    if (deleteTodos) {
      res.status(200).json({
        message: `Delete all ${req.params.status} Todos Sucsses`,
        deleteTodos,
      });
    } else {
      res.status(404).json({
        message: "Delete many Todos Sucsses",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update one todo  update method
const updateOneTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedFields = req.body;

    const updateTodo = await TodoModel.findOneAndUpdate(
      { _id: todoId },
      { $set: updatedFields },
      { new: true }
    );
    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "One todo updated successfully",
      updatedTodo: updateTodo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTodos,
  getOneTodo,
  getByStatus,
  createOneNewTodo,
  createManyNewTodo,
  deleteTodo,
  deleteMany,
  updateOneTodo,
};

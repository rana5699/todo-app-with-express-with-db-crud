// const upload = require("../multer/multer");
const {
  getAllTodos,
  createOneNewTodo,
  getOneTodo,
  createManyNewTodo,
  deleteTodo,
  updateOneTodo,
  getByStatus,
  deleteMany,
} = require("../controlers/todos.cotroler");

const route = require("express").Router();

// get all todos
route.get("/todos", getAllTodos);

// get one todo by ID
route.get("/todos/:id", getOneTodo);

// ! get one todo by STATUS
route.get("/todos/status/:status", getByStatus);

// create new todo
route.post("/onetodo", createOneNewTodo);

// create many new todos
route.post("/manytodo", createManyNewTodo);

// upadet one  todo
route.put("/onetodo/:id", updateOneTodo);

// delete  todo
route.delete("/todos/:id", deleteTodo);
// delete  todo

route.delete("/todos/status/:status", deleteMany);

module.exports = route;

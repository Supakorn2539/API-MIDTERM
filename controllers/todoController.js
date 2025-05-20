const path = require("path");
const jsonServer = require("json-server");
const { getTime } = require("../utils/getTime");
const router = jsonServer.router(path.join(__dirname, "../db/data.json"));
const CustomError = require("../utils/error/customError");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_NO_CONTENT,
} = require("../constants/httpStatusConstant");

exports.getAllTodo = (req, res, next) => {
  const userId = req.userId || req.params.userId;
  const user = router.db
    .get("users")
    .find({ id: parseInt(userId) })
    .value();
  try {
    if (!user) {
      throw new CustomError("user not found", HTTP_STATUS_NOT_FOUND);
    }
    const todos = router.db.get("todos").filter({ userId: parseInt(userId) });
    res.json({ todos: todos.value(), isSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = (req, res, next) => {
  console.log("todo");
  const { taskName, userId } = req.body;
  try {
    if (!taskName || !userId) {
      throw new CustomError("taskName and userId are required", HTTP_STATUS_BAD_REQUEST);
    }

    const todos = router.db.get("todos");
    const id = Math.floor(Math.random() * 10000000);

    const newTodo = {
      id,
      taskName,
      userId,
      completed: false,
      createdAt: getTime(),
      updatedAt: null,
    };
    todos.push(newTodo).write();

    res.status(HTTP_STATUS_CREATED).json({ todo: newTodo, isSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.updateTodoById = (req, res, next) => {
  const { id } = req.params;
  const { taskName, completed } = req.body;
  try {
    const todos = router.db.get("todos");
    const todoToUpdate = todos.find({ id: parseInt(id) }).value();
    if (!todoToUpdate) {
      throw new CustomError("todo not found", HTTP_STATUS_NOT_FOUND);
    }
    todoToUpdate.taskName = taskName;
    todoToUpdate.completed = completed;
    todoToUpdate.updatedAt = getTime();
    todos.write();
    res.json({ todo: todoToUpdate, isSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodoById = (req, res, next) => {
  const { id } = req.params;
  try {
    const todos = router.db.get("todos");
    const todoToDelete = todos.find({ id: parseInt(id) }).value();
    if (!todoToDelete) {
      throw new CustomError("todo not found", HTTP_STATUS_NOT_FOUND);
    }
    todos.remove({ id: parseInt(id) }).write();
    res.status(HTTP_STATUS_NO_CONTENT).json({ todo: todoToDelete, isSuccess: true });
  } catch (err) {
    next(err);
  }
};

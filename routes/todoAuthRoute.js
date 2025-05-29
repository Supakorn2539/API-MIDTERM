const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  getAllTodo,
  createTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todoController");
const {
  validateCreateTodoBody,
  validateUpdateTodoBody,
} = require("../middlewares/validation/todoValidation");

const todoAuthRoute = Router();

/**
 * @swagger
 * /api/V2/todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - [AuthTodos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       taskName:
 *                         type: string
 *                         example: play guitar
 *                       userId:
 *                         type: number
 *                         example: 1
 *                       completed:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         example: "19/05/2568 21:42:54"
 *                       updatedAt:
 *                         type: string
 *                         example: null
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
todoAuthRoute.get("/", authenticate, getAllTodo);

/**
 * @swagger
 * /api/V2/todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - [AuthTodos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskName:
 *                 type: string
 *                 minLength: 5
 *                 example: play guitar
 *               userId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     taskName:
 *                       type: string
 *                       example: play guitar
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     completed:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       example: "19/05/2568 21:42:54"
 *                     updatedAt:
 *                       type: string
 *                       example: null
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request — invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: taskName and userId are required
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
todoAuthRoute.post("/", authenticate, validateCreateTodoBody, createTodo);

/**
 * @swagger
 * /api/V2/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags:
 *       - [AuthTodos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to update
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskName:
 *                 type: string
 *                 minLength: 5
 *                 example: doing homework
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     taskName:
 *                       type: string
 *                       example: doing homework
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     completed:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       example: "19/05/2568 21:42:54"
 *                     updatedAt:
 *                       type: string
 *                       example: "19/05/2568 21:44:54"
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: todo not found
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Bad request — invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: taskName and completed are required
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
todoAuthRoute.put("/:id", authenticate, validateUpdateTodoBody, updateTodoById);

/**
 * @swagger
 * /api/V2/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags:
 *       - [AuthTodos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *
 *       404:
 *         description: todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: todo not found
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
todoAuthRoute.delete("/:id", authenticate, deleteTodoById);

module.exports = todoAuthRoute;

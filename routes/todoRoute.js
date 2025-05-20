const { Router } = require("express");
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

const todoRoute = Router();

/**
 * @swagger
 * /api/V1/todos/{userId}:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: number
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
 *                         example: 19/05/2568 21:42:54
 *                       updatedAt:
 *                         type: string
 *                         example: null
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 */
todoRoute.get("/:userId", getAllTodo);

/**
 * @swagger
 * /api/V1/todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
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
 */

todoRoute.post("/", validateCreateTodoBody, createTodo);

/**
 * @swagger
 * /api/V1/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags:
 *       - Todos
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
 */

todoRoute.put("/:id", validateUpdateTodoBody, updateTodoById);

/**
 * @swagger
 * /api/V1/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags:
 *       - Todos
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
todoRoute.delete("/:id", deleteTodoById);

module.exports = todoRoute;

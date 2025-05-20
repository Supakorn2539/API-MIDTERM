const { Router } = require("express");
const { login, register } = require("../controllers/authController");
const { validateAuthBody } = require("../middlewares/validation/authValidation");

const authRoute = Router();

/**
 * @swagger
 * /api/V1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 6
 *                 example: john doe
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      example: user registered successfully
 *                  isSuccess:
 *                      type: boolean
 *                      example: true
 *       400:
 *         description: Bad request — invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: username already exists
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
authRoute.post("/register", validateAuthBody, register);

/**
 * @swagger
 * /api/V1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 6
 *                 example: john doe
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                      type: string
 *                      example: Login successful
 *                   accessToken:
 *                      type: string
 *                      example: jwt token
 *                   isLogin:
 *                      type: boolean
 *                      example: true
 *                   isSuccess:
 *                      type: boolean
 *                      example: true
 *                   userId:
 *                      type: number
 *                      example: 1
 *       401:
 *         description: unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: username or password is not valid
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
 *                   example: username and password are required
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
authRoute.post("/login", validateAuthBody, login);

module.exports = authRoute;

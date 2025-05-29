const { Router } = require("express");
const { validateAuthBody } = require("../middlewares/validation/authValidation");
const {
  createLikeMovie,
  getAllMovie,
  deleteLikedMovie,
} = require("../controllers/movieController");
const authenticate = require("../middlewares/authenticate");
const { validateCreateLikeMovieBody } = require("../middlewares/validation/movieValidation");

const movieRoute = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all movies
 *     tags: [Movie]
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
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Avengers: Endgame"
 *                       posterPath:
 *                         type: string
 *                         example: /7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg
 *                       movieId:
 *                         type: number
 *                         example: 13883
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
movieRoute.get("/", authenticate, getAllMovie);

/**
 * @swagger
 * /api/V3/movies:
 *   post:
 *     summary: Create a like movie
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - title
 *               - posterPath
 *             properties:
 *               movieId:
 *                 type: number
 *                 example: 13883
 *               title:
 *                 type: string
 *                 example: "Avengers: Endgame"
 *               posterPath:
 *                 type: string
 *                 example: /7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Avengers: Endgame"
 *                     posterPath:
 *                       type: string
 *                       example: /7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg
 *                     movieId:
 *                       type: number
 *                       example: 13883
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
movieRoute.post("/", authenticate, validateCreateLikeMovieBody, createLikeMovie);

/**
 * @swagger
 * /api/V3/movies/{movieId}:
 *   delete:
 *     summary: Delete a like movie by ID
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID of the like movie to delete
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
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Movie not found
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 */
movieRoute.delete("/:movieId", authenticate, deleteLikedMovie);

module.exports = movieRoute;

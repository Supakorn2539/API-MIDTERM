const path = require("path");
const jsonServer = require("json-server");
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
} = require("../constants/httpStatusConstant");
const CustomError = require("../utils/error/customError");
const router = jsonServer.router(path.join(__dirname, "../db/data.json"));

exports.getAllMovie = (req, res) => {
  const userId = req.userId;
  const movies = router.db
    .get("movies")
    .filter({ userId: parseInt(userId) })
    .value();

  res.json({ movies: movies, isSuccess: true });
};

exports.createLikeMovie = (req, res, next) => {
  const { movieId, title, posterPath } = req.body;
  try {
    const existsMovie = router.db
      .get("movies")
      .find({ movieId: parseInt(movieId) })
      .value();
    if (existsMovie) {
      throw new CustomError("movie already favorite", HTTP_STATUS_BAD_REQUEST);
    }
    const movies = router.db.get("movies");
    const id = Math.floor(Math.random() * 10000000);
    const newMovie = {
      id,
      movieId,
      title,
      posterPath,
      userId: req.userId,
    };
    movies.push(newMovie).write();
    delete newMovie.userId;
    res.status(HTTP_STATUS_CREATED).json({ movie: newMovie, isSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteLikedMovie = (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movies = router.db.get("movies");
    const movieToDelete = movies.find({ movieId: parseInt(movieId) }).value();
    if (!movieToDelete) {
      throw new CustomError("movie not found", HTTP_STATUS_NOT_FOUND);
    }
    movies.remove({ movieId: parseInt(movieId) }).write();
    res.status(HTTP_STATUS_NO_CONTENT).json({});
  } catch (err) {
    next(err);
  }
};

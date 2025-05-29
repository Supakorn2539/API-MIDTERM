const z = require("zod");
const validateSchema = require("../../utils/validateSchema");

const createLikeMovieSchema = z
  .object({
    movieId: z.coerce.number(),
    title: z.string().min(1),
    posterPath: z.string().min(1),
  })
  .strict();

exports.validateCreateLikeMovieBody = validateSchema(createLikeMovieSchema);

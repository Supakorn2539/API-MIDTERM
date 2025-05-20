const z = require("zod");
const validateSchema = require("../../utils/validateSchema");

const creteTodoSchema = z
  .object({
    taskName: z.string().min(5, { message: "title must be at least 5 characters" }),
    userId: z.coerce.number(),
  })
  .strict({ message: "only title and userId are allowed" });

const updateTodoSchema = z
  .object({
    taskName: z.string().min(5, { message: "title must be at least 5 characters" }),
    completed: z.boolean(),
  })
  .strict({ message: "only title and userId are allowed" });

exports.validateCreateTodoBody = validateSchema(creteTodoSchema);
exports.validateUpdateTodoBody = validateSchema(updateTodoSchema);

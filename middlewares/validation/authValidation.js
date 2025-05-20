const z = require("zod");
const validateSchema = require("../../utils/validateSchema");

const authSchema = z
  .object({
    username: z.string().min(6, { message: "username must be at least 6 characters" }),
    password: z.string().min(6, { message: "password must be at least 6 characters" }),
  })
  .strict({ message: "only username and password are allowed" });

exports.validateAuthBody = validateSchema(authSchema);

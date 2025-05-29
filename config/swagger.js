const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Todo API",
      version: "1.0.0",
      description: "Express Todo API with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // optional
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/authRoute.js"),
    path.join(__dirname, "../routes/todoRoute.js"),
    path.join(__dirname, "../routes/todoAuthRoute.js"),
    path.join(__dirname, "../routes/movieRoute.js"),
  ], // path ถึงไฟล์ที่มี comment @swagger
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;

const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const swaggerSpec = require("./config/swagger");
const authRoute = require("./routes/authRoute");
const todoRoute = require("./routes/todoRoute");
const todoAuthRoute = require("./routes/todoAuthRoute");
const error = require("./middlewares/errorMiddleware");
const notfound = require("./middlewares/notfoundMiddleware");
const movieRoute = require("./routes/movieRoute");

server.use(cors());
server.use(express.json()); // เพิ่มบรรทัดนี้เพื่อให้ Express อ่าน JSON ใน body ได้
server.use(middlewares);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use("/api/V1/auth", authRoute);

server.use("/api/V1/todos", todoRoute);

server.use("/api/V2/todos", todoAuthRoute);

server.use("/api/V3/movies", movieRoute);

server.use(notfound);
server.use(error);

server.listen(8000, () => {
  console.log("JSON Server is running on Port 8000");
});

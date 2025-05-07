const express = require("express");
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "./db/data.json"));
const middlewares = jsonServer.defaults();

server.use(express.json()); // เพิ่มบรรทัดนี้เพื่อให้ Express อ่าน JSON ใน body ได้
server.use(middlewares);

server.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Access the 'users' collection from the DB
  const users = router.db.get("users");

  // Check if the username already exists
  const isUsernameExist = users.find({ username }).value();

  if (isUsernameExist) {
    return res.status(401).json({ message: "Username already exists" });
  }

  const id = users.value().length;
  // Create a new user object
  const newUser = {
    id: id + 1, // or use a library like uuid
    username,
    password,
  };

  // Save the new user to the database
  users.push(newUser).write();

  // Respond with success
  res.status(201).json({
    message: "Registration successful",
    user: newUser,
  });
});

// เพิ่ม endpoint สำหรับการล็อกอิน
server.post("/login", (req, res) => {
  const { username, password } = req.body;

  // สมมติว่าเราใช้ข้อมูลผู้ใช้จาก db/data.json
  const users = router.db.get("users"); // หรือชื่อฐานข้อมูลที่คุณใช้

  // ค้นหาผู้ใช้ในฐานข้อมูล
  const user = users.find({ username: username }).value();

  // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลและรหัสผ่านตรงกัน
  if (user && user.password === password) {
    // ถ้าตรงกัน ส่งกลับ token หรือข้อมูลที่ต้องการ
    res.json({
      message: "Login successful",
      token: "31a52c816cd02ca28fbbe9fe92f2dfb6sss112",
      isLogin: true,
    });
  } else {
    // ถ้าไม่ตรงกัน ส่งกลับข้อผิดพลาด
    res.status(401).json({ message: "Invalid username or password" });
  }
});

server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running on Port 8000");
});

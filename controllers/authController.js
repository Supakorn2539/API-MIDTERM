const path = require("path");
const jsonServer = require("json-server");
const router = jsonServer.router(path.join(__dirname, "../db/data.json"));
const { hash, comparePassword } = require("../utils/bcrypt");
const { signJwt } = require("../utils/jwt");
const CustomError = require("../utils/error/customError");
const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED } = require("../constants/httpStatusConstant");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  // Access the 'users' collection from the DB
  const users = router.db.get("users");

  // Check if the username already exists
  const isUsernameExist = users.find({ username }).value();
  try {
    if (isUsernameExist) {
      throw new CustomError("username already exists", HTTP_STATUS_BAD_REQUEST);
    }

    const id = users.value().length;
    const hashPassword = await hash(password);
    // Create a new user object
    const newUser = {
      id: id + 1, // or use a library like uuid
      username,
      password: hashPassword,
    };

    // Save the new user to the database
    users.push(newUser).write();

    // Respond with success
    res.status(HTTP_STATUS_CREATED).json({
      message: "Registration successful",
      isSuccess: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  // สมมติว่าเราใช้ข้อมูลผู้ใช้จาก db/data.json
  const users = router.db.get("users"); // หรือชื่อฐานข้อมูลที่คุณใช้

  // ค้นหาผู้ใช้ในฐานข้อมูล
  const user = users.find({ username: username }).value();
  try {
    if (!user) throw new CustomError("username or password is not valid", 401);
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new CustomError("username or password is not valid", 401);
    const jwt = signJwt({ id: user.id, username: user.username });
    res.status(200).json({
      message: "Login successful",
      accessToken: jwt,
      isLogin: true,
      isSuccess: true,
      userId: user.id,
    });
  } catch (err) {
    next(err);
  }

  // // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลและรหัสผ่านตรงกัน
  // if (!comparePassword(password, user.password)) {
  //   // ถ้าตรงกัน ส่งกลับ token หรือข้อมูลที่ต้องการ
  //   try {
  //     const token = signJwt({ id: user.id, username: user.username });
  //     // await fs.writeFile("./jwt/token.json", JSON.stringify({ token }));
  //     res.json({
  //       message: "Login successful",
  //       accessToken: token,
  //       isLogin: true,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } else {
  //   console.log(username);
  //   // ถ้าไม่ตรงกัน ส่งกลับข้อผิดพลาด
  //   res.status(401).json({ message: "Invalid username or password" });
  // }
};

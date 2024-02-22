const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * login user
 */

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await db("*").from("user").where("user_username", username);
    if (data.length == 0) {
      return res
        .status(400)
        .json({ status: 400, success: false, error: "No data added" });
    }
    //   .NOTE                  yakam away la body wary agrin,dwam aw hashaya ka hamana.
    const checkPassword = bcrypt.compareSync(password, data[0].user_password);
    if (checkPassword == false) throw new Error("Invalid credential");
    const token = jwt.sign({ id: data[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        token,
        id: data[0].user_id,
        username: data[0].user_username,
        createdAt: data[0].user_date,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, success: false, error: err.message });
  }
};

/**
 * register user
 */

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    //.NOTE username and password is empty.
    if (!username && !password) {
      return res
        .status(400)
        .json({ status: 400, success: false, error: "Invalid data" });
    }

    const [createdId] = await db("user").insert({
      user_username: username,
      user_password: hashedPassword,
    });
    if (createdId.length == 0) {
      return res
        .status(400)
        .json({ status: 400, success: false, error: "No data added" });
    }

    const data = await db
      .select({
        id: "user_id",
        username: "user_username",
        password: "user_password",
      })
      .from("user")
      .where("user_id", createdId);

    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "User not found" });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data,
    });
  } catch (err) {
    if (err.errno == 1062) {
      return res
        .status(500)
        .json({ status: 500, success: false, error: "Username Already token" });
    }
    return res
      .status(500)
      .json({ status: 500, success: false, error: err.message });
  }
};

module.exports = { login, register };

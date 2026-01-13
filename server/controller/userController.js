//db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const { StatusCodes } = require("http-status-codes");
// sync function to send data to our database using json format which we used from express as a middleware

const jwt = require("jsonwebtoken");
async function register(req, res) {
  console.log("REGISTER HIT");
  console.log("BODY:", req.body);
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information" });
  }
  //to avoid one user to register twice
  try {
    const [existingUser] = await dbConnection.query(
      "SELECT user_id, username, email FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered with this username or email" });
    }
    //   to make the password strong
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters " });
    }
    //encrypted the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    //to register a new user
    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong ,try again later!" });
  }
}

// login

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter both email and password" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT user_id, username, password FROM users WHERE email = ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    const username = user[0].username;
    const user_id = user[0].user_id;

    const token = jwt.sign({ username, user_id }, 'C2KlDKA0U9okSY6eSDcctbVC2idPDHeH', { expiresIn: "1d" });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token, user_id, username });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong ,try again later!" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };

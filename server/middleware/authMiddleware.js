const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  // ✅ ALLOW CORS PREFLIGHT REQUESTS
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1. Change 'userid' to 'user_id' to match your Login logic
    const { username, user_id } = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Attach it to req.user exactly as you'll use it in controllers
    req.user = { username, user_id };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;

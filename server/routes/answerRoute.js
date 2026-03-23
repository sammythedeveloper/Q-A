const express = require("express");
const router = express.Router();

// Answer controllers
const { allanswers, answerquestion } = require("../controller/answerControl");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/answerquestion", authMiddleware, answerquestion);
router.get("/allanswers/:questionId", allanswers);

module.exports = router;

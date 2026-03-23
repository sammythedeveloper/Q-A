const express = require("express");
const router = express.Router();

//This is used to make this web application in MVC(model-(database modle or schema which spicify database design) , view-(is front-end folder part),controller-(folder that communicate with the database ) architecture

//answer controllers
const { allanswers, answerquestion } = require("../controller/answerControl");
const authMiddleware = require("../middleware/authMiddleware");

//answer router

router.post("/answerquestion", authMiddleware, answerquestion);

router.get("/allanswers/:question_id", authMiddleware, allanswers);

module.exports = router;

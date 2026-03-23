const express = require("express");
const router = express.Router();

// 1. i just Imported the Auth Middleware
const authMiddleware = require('../middleware/authMiddleware'); 
const { askquestion, allquestions, singlequestion } = require('../controller/questionControl');

router.post("/askquestion", authMiddleware, askquestion);
router.get("/allquestions", allquestions); 
router.get("/singlequestion", singlequestion);

module.exports = router;
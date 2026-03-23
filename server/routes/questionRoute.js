// const express = require("express");
// const router = express.Router();

// //question controllers
// const { askquestion , allquestions ,singlequestion }=require('../controller/questionControl')

// //question router

// router.post("/askquestion",askquestion)

// router.get("/allquestions",allquestions );

// router.get("/singlequestion",singlequestion );




// module.exports = router;
const express = require("express");
const router = express.Router();

// 1. Import the Auth Middleware
const authMiddleware = require('../middleware/authMiddleware'); 

// 2. Question controllers
const { askquestion, allquestions, singlequestion } = require('../controller/questionControl');

// 3. SECURE THE ROUTE
// authMiddleware will verify the token and attach the user to the request
router.post("/askquestion", authMiddleware, askquestion);

// These can stay public or you can protect them too
router.get("/allquestions", allquestions); 
router.get("/singlequestion", singlequestion);

module.exports = router;
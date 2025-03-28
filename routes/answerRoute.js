const express = require("express");
const router = express.Router();



//This is used to make this web application in MVC(model-(database modle or schema which spicify database design) , view-(is front-end folder part),controller-(folder that communicate with the database ) architecture

//answer controllers
const {allanswers, answerquestion}=require('../controller/answerControl')

//answer router


  
router.post('/answerquestion', answerquestion)

router.get('/allanswers/:question_id',allanswers )

module.exports = router;
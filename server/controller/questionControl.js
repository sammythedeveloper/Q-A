// dbconnection
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require('uuid');
async function askquestion(req, res) {
  const { question_id,user_id, question, description } = req.body;
  req.body.questionid = uuidv4();
  console.log(req.body);

  //validate with condition
  if (!question || !description) {
    return res.status(400).json({ msg: "Please fill all required fields (question and description" });
  
  } try {
    await dbConnection.query("INSERT INTO questions(question_id,user_id,question,description) VALUES (?,?,?,?)", [question_id, user_id, question, description])
    return res.status(201).json({ msg: "Question asked successfully" });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg:"something went wrong,try again later!"})
  
  }
}


async function allquestions(req, res) {
  try {
    // Query to get all questions with the username of the user who posted them
    const [questions] = await dbConnection.query(
      `SELECT questions.question_id, questions.user_id, questions.question, questions.description, users.username
       FROM questions 
       JOIN users ON questions.user_id = users.user_id`
    );
    
    if (questions.length > 0) {
      return res.status(200).json(questions);  // Return all questions with the associated username
    } else {
      return res.status(404).json({ msg: "No questions found" });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong, please try again later!" });
  }
}

async function singlequestion(req, res) {
  const { question_id } = req.body;  // Destructure 'question_id' from req.body

  // Validate that 'question_id' is provided and is a valid number
  if (!question_id || isNaN(question_id)) {
    return res.status(400).json({ msg: "Invalid question_id provided" });
  }

  try {
    // Query to fetch a single question based on 'question_id'
    const [question] = await dbConnection.query(
      `SELECT question_id, user_id, question, description 
       FROM questions 
       WHERE question_id = ?`, [question_id]
    );

    // Check if the question was found
    if (!question || question.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Return the single question
    return res.status(200).json({ SingleQuestion: question });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong, please try again later!" });
  }
}

  
  module.exports = { askquestion, allquestions, singlequestion }
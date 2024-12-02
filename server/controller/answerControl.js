// dbconnection
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
async function answerquestion(req, res) {
  const { user_id, question_id, answer } = req.body;
  console.log(req.body);

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please Write your Answer first" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (user_id, question_id, answer) VALUES (?, ?, ?)",
      [user_id, question_id, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Your answer has been posted!" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later!" });
  }
}

async function answerallquestions(req, res) {
  const { question_id } = req.params;
  try {
    // Retrieve all answers for the specified question, along with the username of the user who posted the answer
    const [answers] = await dbConnection.query(
      `SELECT 
        answers.answer, 
        answers.user_id, 
        users.username, 
        questions.question_id 
      FROM answer 
      JOIN users ON answers.user_id = users.user_id 
      JOIN question ON answers.question_id = questions.question_id 
      WHERE answers.question_id = ?`,
      [question_id]
    );
    console.log(answers);

    if (answers.length > 0) {
      return res.status(StatusCodes.OK).json(answers);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No answers found for this question." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later!" });
  }
}

module.exports = { answerallquestions, answerquestion };

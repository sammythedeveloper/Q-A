// dbconnection
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");

async function askquestion(req, res) {
  const { question, description, tags } = req.body; // tags is an array: ['javascript', 'react']
  const user_id = req.user.user_id;
  const question_id = uuidv4();

  if (!question || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please fill all fields" });
  }

  try {
    // 1. here i Insert the Question
    await dbConnection.query(
      "INSERT INTO questions(question_id, user_id, question, description) VALUES (?, ?, ?, ?)",
      [question_id, user_id, question, description]
    );

    // 2. here i Handle Tags (if any)
    if (tags && tags.length > 0) {
      for (let tagName of tags) {
        // Find or Create the Tag
        let [tagRows] = await dbConnection.query(
          "SELECT tag_id FROM tags WHERE tag_name = ?",
          [tagName]
        );
        let tagId;

        if (tagRows.length === 0) {
          const [result] = await dbConnection.query(
            "INSERT INTO tags (tag_name) VALUES (?)",
            [tagName]
          );
          tagId = result.insertId;
        } else {
          tagId = tagRows[0].tag_id;
        }

        // here i Link Tag to Question in the Bridge Table
        await dbConnection.query(
          "INSERT INTO question_tags (question_id, tag_id) VALUES (?, ?)",
          [question_id, tagId]
        );
      }
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question and tags saved successfully!" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

async function allquestions(req, res) {
  try {
    // here i Query to get all questions with the username of the user who posted them
    const [questions] = await dbConnection.query(
      `SELECT questions.question_id, questions.user_id, questions.question, questions.description, users.username
       FROM questions 
       JOIN users ON questions.user_id = users.user_id`
    );

    if (questions.length > 0) {
      return res.status(200).json(questions); // Return all questions with the associated username
    } else {
      return res.status(404).json({ msg: "No questions found" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later!" });
  }
}

async function singlequestion(req, res) {
  const { questionId } = req.query; // by this i Get 'questionId' from query parameters

  // here i can validate that 'question_id' is provided and is a valid number
  if (!questionId || isNaN(questionId)) {
    return res.status(400).json({ msg: "Invalid question_id provided" });
  }

  try {
    // here i can Query to fetch a single question based on 'question_id'
    const [question] = await dbConnection.query(
      `SELECT question_id, user_id, question, description 
       FROM questions 
       WHERE question_id = ?`,
      [questionId]
    );

    // here i can Check if the question was found
    if (!question || question.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Return the single question
    return res.status(200).json({ SingleQuestion: question });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later!" });
  }
}

module.exports = { askquestion, allquestions, singlequestion };

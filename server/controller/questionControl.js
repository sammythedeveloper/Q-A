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
    const [questions] = await dbConnection.query(
      `SELECT 
        q.question_id, 
        q.user_id, 
        q.question, 
        q.description, 
        u.username,
        GROUP_CONCAT(t.tag_name) AS tags -- This grabs all tags for the question
       FROM questions q
       JOIN users u ON q.user_id = u.user_id
       LEFT JOIN question_tags qt ON q.question_id = qt.question_id
       LEFT JOIN tags t ON qt.tag_id = t.tag_id
       GROUP BY q.question_id`
    );

    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ msg: "Database error" });
  }
}

async function singlequestion(req, res) {
  const { questionId } = req.query;

  if (!questionId) {
    return res.status(400).json({ msg: "Question ID is required" });
  }

  try {
    const [question] = await dbConnection.query(
      `SELECT q.question_id, q.user_id, q.question, q.description, u.username
       FROM questions q
       JOIN users u ON q.user_id = u.user_id
       WHERE q.question_id = ?`,
      [questionId]
    );

    if (question.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    return res.status(200).json({ SingleQuestion: question });
  } catch (error) {
    console.error("🔥 Error fetching single question:", error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

module.exports = { askquestion, allquestions, singlequestion };

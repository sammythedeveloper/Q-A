const dbConnection = require("../db/dbConfig"); // Use require, not import
const { StatusCodes } = require("http-status-codes");

// ENSURE NO "await" IS SITTING HERE OUTSIDE A FUNCTION

async function answerquestion(req, res) {
  const { question_id, answer } = req.body;
  const actor_id = req.user.user_id;

  try {
    // 1. Save the answer first
    await dbConnection.query(
      "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
      [question_id, actor_id, answer]
    );

    // 2. Find who owns the question
    const [questionOwner] = await dbConnection.query(
      "SELECT user_id FROM questions WHERE question_id = ?",
      [question_id]
    );

    // Safety check: make sure the question actually exists
    if (questionOwner.length > 0) {
      const receiver_id = questionOwner[0].user_id;

      // 3. Notify the owner (Anna)
      if (receiver_id !== actor_id) {
        await dbConnection.query(
          "INSERT INTO notifications (receiver_id, actor_id, question_id, message) VALUES (?, ?, ?, ?)",
          [
            receiver_id,
            actor_id,
            question_id,
            `answered your question: "${answer.substring(0, 20)}..."`,
          ]
        );
      }
    }

    return res.status(StatusCodes.CREATED).json({ msg: "Answer posted!" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
}

async function allanswers(req, res) {
  // 1. Get the questionId from the URL parameters (/allanswers/:questionId)
  const { questionId } = req.params;

  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Question ID is required" });
  }

  try {
    // 2. SQL Query to get answers + the username of the answerer
    const [answers] = await dbConnection.query(
      `SELECT 
        a.answer, 
        a.user_id, 
        u.username,
        a.created_at
      FROM answers a
      JOIN users u ON a.user_id = u.user_id 
      WHERE a.question_id = ?
      ORDER BY a.answer_id DESC`, // Shows newest answers first
      [questionId]
    );

    // 3. Return the array (even if empty) with a 200 OK
    // This ensures your frontend "No answers yet" UI works instead of crashing
    return res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later!" });
  }
}

module.exports = { allanswers, answerquestion };

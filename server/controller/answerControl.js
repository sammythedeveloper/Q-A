// dbconnection
async function answerquestion(req, res) {
  const { question_id, answer } = req.body;
  const actor_id = req.user.user_id; // The person answering

  try {
    // 1. here i Post the Answer
    await dbConnection.query(
      "INSERT INTO answers (user_id, question_id, answer) VALUES (?, ?, ?)",
      [actor_id, question_id, answer]
    );

    // 2. here i get the Original Asker's ID (receiver_id)
    const [questionOwner] = await dbConnection.query(
      "SELECT user_id FROM questions WHERE question_id = ?",
      [question_id]
    );

    if (questionOwner.length > 0) {
      const receiver_id = questionOwner[0].user_id;

      // 3. here i Create Notification (unless i answered my own question!)
      if (receiver_id !== actor_id) {
        await dbConnection.query(
          "INSERT INTO notifications (receiver_id, actor_id, question_id, message) VALUES (?, ?, ?, ?)",
          [
            receiver_id,
            actor_id,
            question_id,
            "Someone answered your question!",
          ]
        );
      }
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted and user notified!" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to post answer" });
  }
}

async function allanswers(req, res) {
  const { question_id } = req.params;
  try {
    console.log("Received question_id:", question_id); // Add logging to ensure it's correct

    //  here i Retrieve all answers for the specified question, along with the username of the user who posted the answer
    const [answers] = await dbConnection.query(
      `SELECT 
        answers.answer, 
        answers.user_id, 
        users.username
      FROM answers 
      JOIN users ON answers.user_id = users.user_id 
      WHERE answers.question_id = ?`,
      [question_id]
    );

    // here i Check if there are answers
    if (Array.isArray(answers) && answers.length > 0) {
      return res.status(StatusCodes.OK).json(answers);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No answers found for this question." });
    }
  } catch (error) {
    console.error("Error fetching answers:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later!" });
  }
}

module.exports = { allanswers, answerquestion };

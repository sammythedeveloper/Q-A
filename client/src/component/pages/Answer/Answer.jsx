import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ questionId }) => {
  const [answer, setAnswer] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Retrieve the user_id from localStorage (or another source)
    const userId = localStorage.getItem("user_id");

    // Validate fields
    if (!answer.trim()) {
      setErrorMessage("Answer cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/answerQuestion", {
        user_id: userId,
        question_id: questionId,
        answer,
      });

      if (response.status === 201) {
        setSuccessMessage("Your answer has been posted!");
        setAnswer(""); // Clear the form
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "Something went wrong. Try again later."
      );
    }
  };

  return (
    <div className="answer-form">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border rounded-lg p-2"
          placeholder="Write your answer here..."
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;

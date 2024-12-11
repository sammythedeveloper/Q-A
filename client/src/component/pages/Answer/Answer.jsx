import React, { useState, useEffect } from "react";
import api from "../../../Context/API"; // Assuming this is your API instance
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks

const AnswerForm = () => {
  const location = useLocation(); // Get the current location to access query params
  const navigate = useNavigate(); // Initialize navigate function
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);     //To store answers for the question
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Extract questionId from query parameters
  const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get("questionId");

  // Fetch the question details using the questionId
  useEffect(() => {
    if (questionId) {
      api
        .get(`/questions/singlequestion?questionId=${questionId}`) // Call the updated backend route
        .then((response) => {
          setQuestion(response.data.SingleQuestion[0]); // Assuming the backend sends an array with the question
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Could not load question details.");
        });
    }
          // Fetch answers for the question
          api
          .get(`/answers/allanswers?questionId=${questionId}`)
          .then((response) => {
            setAnswers(response.data); // Assuming this returns an array of answers
          })
          .catch((error) => {
            console.error(error);
            setErrorMessage("Could not load answers.");
          });
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Retrieve the user_id from localStorage (or another source)
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setErrorMessage("User is not logged in.");
      return;
    }

    // Validate fields
    if (!answer.trim()) {
      setErrorMessage("Answer cannot be empty.");
      return;
    }

    try {
      const response = await api.post("answers/answerquestion", {
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
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient py-4 px-6 flex justify-between items-center">
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
          >
            Dashboard
          </button>
        </div>
        {/* Logout Button at the Top Right */}
        <button
          onClick={() => navigate("/signin")}
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
        >
          Log Out
        </button>
      </header>

      {/* Motivational Message */}
      <div className="py-4 text-center">
        <p className="text-white text-2xl font-semibold">
          Answering questions helps others learn too. Share your knowledge!
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-4xl w-full mx-auto mt-10 flex-1">
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

        {question && (
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
              Answer the Question
            </h2>
            <p className="text-xl font-medium text-gray-800 mb-4">{question.question}</p>
            <p className="text-lg text-gray-700 mb-8">{question.description}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Write your answer here..."
            ></textarea>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition w-full text-lg"
          >
            Submit Answer
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6 mt-6 text-center text-white">
        <p className="text-lg">
          © 2024 Your Company Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AnswerForm;

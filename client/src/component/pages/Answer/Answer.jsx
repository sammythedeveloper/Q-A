import React, { useState, useEffect } from "react";
import api from "../../../Context/API"; 
import { useLocation, useNavigate } from "react-router-dom"; 

const AnswerForm = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for answers

  const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get("questionId");

  useEffect(() => {
    if (questionId) {
      api
        .get(`/questions/singlequestion?questionId=${questionId}`)
        .then((response) => {
          setQuestion(response.data.SingleQuestion[0]);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Could not load question details.");
        });
    }

    api
      .get(`/answers/allanswers/${questionId}`)
      .then((response) => {
        setAnswers(response.data);
        setLoading(false); // Set loading to false once answers are fetched
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Could not load answers.");
        setLoading(false);
      });
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setErrorMessage("User is not logged in.");
      return;
    }

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
        setAnswer(""); 
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Try again later.");
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
        <button
          onClick={() => navigate("/signin")}
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
        >
          Log Out
        </button>
      </header>

      {/* Motivational Message */}
      <div className="py-4 text-center">
        <p className="text-white text-2xl font-semibold animate-shine">
          Answering questions helps others learn too. Share your knowledge!
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-4xl w-full mx-auto mt-10 flex-1">
        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 mb-4 text-center">{successMessage}</p>
        )}

        {question && (
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
              Answer the Question
            </h2>
            <p className="text-xl font-medium text-gray-800 mb-4">
              {question.question}
            </p>
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

        {/* Display Answers */}
        <div className="mt-10 space-y-8">
          {loading ? (
            <div className="text-center">Loading answers...</div>
          ) : (
            answers.length > 0 ? (
              answers.map((answer, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {answer.username[0]}
                    </div>
                    <p className="text-lg font-semibold">{answer.username}</p>
                  </div>
                  <p className="text-gray-700">{answer.answer}</p>
                </div>
              ))
            ) : (
              <div className="text-center">No answers yet.</div>
            )
          )}
        </div>
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

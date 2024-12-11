import React, { useEffect, useState } from 'react';
import api from "../../../Context/API"; 
import { motion } from "framer-motion"; // for animations similar to Dashboard
import { FaQuestionCircle } from "react-icons/fa"; // For the question icon in the button
import { useNavigate } from 'react-router-dom';

const AllQuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all questions from the backend when the component mounts
    api
      .get('/questions/allquestions') // Assuming your backend route is "/api/questions"
      .then((response) => {
        setQuestions(response.data); // Set questions from the response
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((err) => {
        setError('Something went wrong, please try again later!');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-xl py-8">Loading questions...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  // Function to get the first letter of the username
  const getInitials = (username) => {
    return username && username.length > 0 ? username[0].toUpperCase() : '';
  };

    // Handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to sign-in page after logout
    navigate("/signin");
  };


  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen text-white font-sans">
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between ">
      <button
            onClick={() => navigate("/dashboard")}
            className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
          >
            Dashboard
          </button>
        <button
          onClick={handleLogout} // Calling the logout function
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
        >
          Logout
        </button>
      </div>
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-heading font-extrabold mb-6 tracking-wide"
          >
            Questions to Answer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg mb-8 font-medium"
          >
            Browse through the questions posted by others and share your knowledge.
          </motion.p>
        </div>
      </header>

      {/* Questions List Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questions.map((question) => (
              <div
                key={question.question_id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-semibold text-purple-800">{question.question}</h3>
                  <p className="text-gray-700">{question.description}</p>
                  <div className="flex items-center">
                    {/* Avatar with Initials */}
                    <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center mr-4">
                      <span className="text-xl font-bold">{getInitials(question.username)}</span>
                    </div>
                    <p className="text-gray-600">
                      Asked by: <span className="font-semibold">{question.username}</span>
                    </p>
                  </div>
                  <button
                  onClick={() => navigate(`/answerquestion?questionId=${question.question_id}`)} 
                    className="bg-gradient-to-br from-green-500 to-green-700 text-white px-6 py-3 mt-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-800 transition flex items-center space-x-2">
                    <FaQuestionCircle />
                    <span>Answer this question</span>
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 DevConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AllQuestionList;

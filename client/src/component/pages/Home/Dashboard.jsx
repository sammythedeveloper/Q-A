import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Using useNavigate for programmatic navigation
import { motion } from "framer-motion";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Check if token is stored in localStorage
    const token = localStorage.getItem("token");

    // If there's no token, redirect to the login page
    if (!token) {
      setIsAuthenticated(false);
      navigate("/signin"); // Redirect to sign-in if no token
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // If not authenticated, return null or handle redirection inside useEffect
  if (!isAuthenticated) {
    return null;
  }

  // Handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to sign-in page after logout
    navigate("/signin");
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen text-white font-sans flex flex-col ">
      {/* Fixed Logout Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleLogout} // Calling the logout function
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 ">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-heading font-extrabold mb-6 tracking-wide"
          >
            Welcome to Your Dashboard!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg mb-8 font-medium"
          >
            Ask questions, share knowledge, and connect with the brightest minds in development.
          </motion.p>
        </div>
      </header>

      {/* Community Actions Section */}
      <section className="py-16 bg-white text-gray-800 flex-grow ">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading font-bold text-center mb-8"
          >
            Get Involved with the Community
          </motion.h2>
          <div className="text-center space-y-6">
            <button
              onClick={() => navigate("/ask-question")}
              className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
            >
              Want to ask a question? Click here!
            </button>
            <button
              onClick={() => navigate("/allQuestions")}
              className="bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-green-700 transition"
            >
              Want to give answers? Click here!
            </button>
            <button
              onClick={() => navigate("/explore-questions")}
              className="bg-purple-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
            >
              Explore questions and see the community!
            </button>
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

export default Dashboard;

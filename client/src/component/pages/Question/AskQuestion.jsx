import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Context/API"; // Assuming this is your API instance
import { Button } from "../Home/Button";
import { SectionBorder } from "../Home/SectionBorder";
import GlobalLayout from "../Layout/GlobalLayout";


const AskQuestion = () => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    // Get the user_id from localStorage (assuming it is stored as 'user_id')
    const userId = localStorage.getItem("user_id");

    // Form validation
    const validationErrors = {};
    if (!formData.question)
      validationErrors.question = "Question title is required";
    if (!formData.description)
      validationErrors.description = "Question description is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post("questions/askquestion", {
        user_id: userId, // Add user_id here
        question: formData.question,
        description: formData.description,
      });

      if (response.status === 201) {
        setSuccessMessage("Question asked successfully!");
        setTimeout(() => {
          navigate("/allQuestions"); // Redirect to questions list or homepage
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setErrors({
          server:
            error.response.data.msg || "Something went wrong. Try again later.",
        });
      } else {
        console.error("An unexpected error occurred:", error.message);
        setErrors({ server: "An unexpected error occurred. Try again later." });
      }
    }
  };

  // Navigate to dashboard or logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to sign-in page after logout
    navigate("/signin");
  };


  return (
    <GlobalLayout>
    <section className="min-h-screen flex flex-col overflow-x-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16 flex-grow">
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-blue-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]"></div>
        {/* Motivational Message */}
        <SectionBorder>
          <div className="py-4 text-center">
            <p className="text-white text-2xl font-semibold">
              Asking questions is a step towards learning and growth. Don't
              hesitate to ask!
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-xl rounded-lg p-10 max-w-4xl w-full mx-auto mt-10">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
              Ask a Question
            </h2>
            {successMessage && (
              <p className="text-green-500 mb-4 text-center">{successMessage}</p>
            )}
            {errors.server && (
              <p className="text-red-500 mb-4 text-center">{errors.server}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="question"
                  className="block text-gray-700 font-medium mb-3 text-lg"
                >
                  Question Title
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="Enter your question title"
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-3 text-lg"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-6 py-4 border border-gray-300 rounded-lg text-black  focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="Provide a detailed description of your question"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-blue-900 text-white rounded-full hover:bg-green-700 transition w-full text-lg"
              >
                Submit Question
              </Button>
            </form>
          </div>
        </SectionBorder>
      </div>
      </section>
      </GlobalLayout>
  );
};

export default AskQuestion;

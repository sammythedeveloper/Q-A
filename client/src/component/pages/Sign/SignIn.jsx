import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { motion } from "framer-motion";
import api from "../../../Context/API";  // Assuming you have an api instance

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) {
      formErrors.email = "Email is required.";
    }
    if (!formData.password) {
      formErrors.password = "Password is required.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make the POST request to the backend
        const response = await api.post("/users/login", formData);
        console.log(response.data);  // You can remove this after testing

        if (response.data.token) {
          // Save the token in localStorage
          localStorage.setItem("token", response.data.token);
          if (response.data.user_id) {
            localStorage.setItem("user_id", response.data.user_id);
          }

          // Redirect to the dashboard
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        // Handle any error (e.g., wrong credentials)
        if (error.response) {
          setErrors({ ...errors, general: error.response.data.msg });
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen text-white font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link to="/" className="text-3xl font-bold">DevConnect</Link>
        </div>
      </header>

      {/* Sign In Form */}
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
            </div>
            {errors.general && <p className="text-red-600 text-sm mt-2">{errors.general}</p>} {/* Display general error */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 DevConnect. All rights reserved.</p>
          <nav>
            <Link to="/" className="text-white px-4 hover:underline">Home</Link>
            <Link to="/contact" className="text-white px-4 hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;

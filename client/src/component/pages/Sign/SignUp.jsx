import api from "../../../Context/API";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const navigate = useNavigate(); // Initialize the navigate function

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

    // Validation
    let validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.firstname) validationErrors.firstname = "First name is required";
    if (!formData.lastname) validationErrors.lastname = "Last name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (!formData.confirmPassword) validationErrors.confirmPassword = "Please confirm your password";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.post("/users/register", formData);
        console.log(response.data); 

        if (response.status === 201) {
          setSuccessMessage("Registration successful!");
          setShowModal(true); // Show the modal on success
          setFormData({
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
          
          // Navigate to the sign-in page after successful registration
          setTimeout(() => {
            navigate("/signin"); // Navigate to the Sign In page
          }, 3000); // Adjust the timeout (3000 ms = 3 seconds)
        }
      } catch (error) {
        if (error.response) {
          setErrors((prev) => ({
            ...prev,
            server: error.response.data.msg || "Registration failed. Please try again.",
          }));
        } else {
          console.error("An unexpected error occurred:", error.message);
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen text-white font-sans">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link to="/" className="text-3xl font-bold">DevConnect</Link>
        </div>
      </header>
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          {errors.server && <p className="text-red-500 text-center mb-4">{errors.server}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="firstname" className="block text-gray-600">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
                placeholder="Enter your first name"
              />
              {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
            </div>
            <div>
              <label htmlFor="lastname" className="block text-gray-600">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
                placeholder="Enter your last name"
              />
              {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 DevConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;

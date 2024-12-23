import api from "../../../Context/API";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Home/Header";
import { SectionBorder } from "../Home/SectionBorder";
import { Planet } from "../Home/Planet";
import { Orbit } from "../Home/Orbit";

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
    <div className=" text-white md:px-8">
      <Header />
      <SectionBorder>
      <div className=" relative py-24 md:py-36 lg:py-48 isolate overflow-hidden [mask-image:liner-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <div className=" absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-blue-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]"></div>
        <div className="absolute inset-0 -z-10  ">
          <div className=" absolute-center">
            <Orbit className="size-[350px] " />
          </div>
          <div className=" absolute-center">
            <Orbit className="size-[600px]" />
          </div>
          <div className=" absolute-center">
            <Orbit className="size-[850px]" />
          </div>
          <div className=" absolute-center">
            <Orbit className="size-[1100px]" />
          </div>
          <div className=" absolute-center">
            <Orbit className="size-[1350px]" />
          </div>
          </div>
          <div className="flex items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:max-w-md max-w-sm rounded-lg shadow-lg  w-full"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          {errors.server && <p className="text-red-500 text-center mb-4">{errors.server}</p>}
          <form onSubmit={handleSubmit} className="space-y-6  text-black ">
            <div>
              <label htmlFor="username" className="block">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="firstname" className="block ">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your first name"
              />
              {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
            </div>
            <div>
              <label htmlFor="lastname" className="block">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                placeholder="Enter your last name"
              />
              {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block ">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          <p className="mt-4 text-center  text-black">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
            </motion.div>
            </div>
          <div className="relative isolate max-w-5xl mx-auto">
          <div className=" absolute left-1/2 top-0 ">
            <Planet
              size="lg"
              color="white"
              className=" -translate-x-[436px] -translate-y-[176px] rotate-135 "
            />

            <Planet
              size="md"
              color="blue"
              className=" translate-x-[434px] -translate-y-[260px] -rotate-135 "
            />
            <Planet
              size="lg"
              color="green"
              className=" translate-x-[308px] -translate-y-[572px] -rotate-135 "
            />
            <Planet
              size="sm"
              color="orange"
              className=" -translate-x-[288px] -translate-y-[682px] rotate-135 "
            />
          </div>
        </div>
      </div>
      <footer className="text-white py-8 border-t border-gray-300 bg-gradient-to-br from-transparent to-gray-800 ">
        <div className=" text-center">
          <p className="text-sm">
            {" "}
            © {new Date().getFullYear()} Developed by Sammythedeveloper. All
            rights reserved.
          </p>
          <p className="text-sm mt-2">
            Built with <span className="text-blue-500">love</span> and
            creativity.
          </p>
        </div>
        </footer>
        </SectionBorder>
    </div>
  );
};

export default SignUp;

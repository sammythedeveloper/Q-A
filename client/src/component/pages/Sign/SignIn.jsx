import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import api from "../../../Context/API"; // Assuming you have an api instance
import Header from "../Home/Header";
import { Orbit } from "../Home/Orbit";
import { Planet } from "../Home/Planet";
import { SectionBorder } from "../Home/SectionBorder";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize navigate

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
        console.log(response.data); // You can remove this after testing

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
        if (error.response) {
          setErrors({ ...errors, general: error.response.data.msg });
        }
      }
    }
  };

  return (
    <div className="md:px-8">
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
            className="bg-white  border-white p-8 rounded-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-gradient-to-br from-transparent"
          >
            <h2 className="text-3xl font-semibold text-center  text-black mb-6">
              Sign In to Your Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-black">
                  Email
                </label>
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
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-black ">
                  Password
                </label>
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
                {errors.password && (
                  <p className="text-red-600 text-sm mt-2">{errors.password}</p>
                )}
              </div>
              {errors.general && (
                <p className="text-red-600 text-sm mt-2">{errors.general}</p>
              )}{" "}
              {/* Display general error */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-center text-black">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
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

export default SignIn;

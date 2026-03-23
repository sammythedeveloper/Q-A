import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../../Context/API";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation check
    let vErrors = {};
    if (formData.password !== formData.confirmPassword)
      vErrors.confirmPassword = "Passwords match failed";

    if (Object.keys(vErrors).length > 0) return setErrors(vErrors);

    try {
      const response = await api.post("/users/register", formData);
      if (response.status === 201) {
        setSuccessMessage("Account created! Redirecting...");
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (error) {
      setErrors({ server: error.response?.data?.msg || "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[800px] border border-slate-200">
        {/* Left Sidebar: Brand Section (Matches SignIn) */}
        <div className="w-full md:w-[40%] bg-[#030712] p-12 md:p-20 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 w-fit mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Join the Alpha
              </span>
            </div>
            <Link to="/" className="group flex flex-col items-start">
              {/* The Text */}
              <h1 className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 transition-all duration-500 group-hover:to-blue-400">
                Stacky
              </h1>

              {/* The Dynamic Line */}
              <div className="w-12 h-1.5 bg-blue-600 rounded-full mt-2 transition-all duration-500 ease-in-out group-hover:w-32 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
            </Link>

            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium max-w-sm">
              Create an account to ask questions, share knowledge, and{" "}
              <span className="text-white">grow your dev career.</span>
            </p>

            <div className="mt-12 flex items-center gap-4 text-slate-500 text-sm border-t border-slate-800/50 pt-8">
              <p className="font-medium tracking-tight italic">
                "The best place for junior devs to learn."
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Expanded Form area */}
        <div className="w-full md:w-[60%] p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
          <div className="max-w-2xl w-full mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Create an account
            </h2>
            <p className="text-slate-500 mb-10">
              Already a member?{" "}
              <Link
                to="/signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Grid for First/Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="John"
                    className="input-style"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    className="input-style"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="your username"
                  className="input-style"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  className="input-style"
                  onChange={handleChange}
                />
              </div>

              {/* Grid for Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="input-style"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="input-style"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Status Messages */}
              {successMessage && (
                <p className="text-emerald-500 font-medium text-sm text-center">
                  {successMessage}
                </p>
              )}
              {errors.server && (
                <p className="text-red-500 font-medium text-sm text-center">
                  {errors.server}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-400  hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98] mt-4"
              >
                Create Account
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-6">
                By clicking "Create Account", you agree to our{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

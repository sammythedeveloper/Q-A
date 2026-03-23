import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../context/API.js";
// 1. Import icons from Lucide
import { Eye, EyeOff } from "lucide-react";

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

  // 2. Add two separate states for visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        {/* Left Sidebar (Keeping your original branding) */}
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
              <h1 className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 transition-all duration-500 group-hover:to-blue-400">
                Stacky
              </h1>
              <div className="w-12 h-1.5 bg-blue-600 rounded-full mt-2 transition-all duration-500 ease-in-out group-hover:w-32 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
            </Link>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium max-w-sm">
              Create an account to ask questions, share knowledge, and{" "}
              <span className="text-white">grow your dev career.</span>
            </p>
          </div>
        </div>

        {/* Right Section: Form area */}
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
              {/* Name Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="John"
                    className="input-style w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
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
                    className="input-style w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
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
                  className="input-style w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
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
                  className="input-style w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
                  onChange={handleChange}
                />
              </div>

              {/* Password Grid with Eye Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="input-style w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none pr-12"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="input-style w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none pr-12"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium">
                      {errors.confirmPassword}
                    </p>
                  )}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98] mt-4"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

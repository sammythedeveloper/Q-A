import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../context/API.js";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  // 2. Add the visibility state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.msg || "Login failed" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-slate-200">
        {/* Left Sidebar (No changes here, kept your cool branding) */}
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
                Community Live
              </span>
            </div>
            <Link to="/" className="group flex flex-col items-start w-fit">
              <h1 className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 transition-all duration-500 group-hover:to-blue-400">
                Stacky
              </h1>
              <div className="w-12 h-1.5 bg-blue-600 rounded-full mt-2 transition-all duration-500 ease-in-out group-hover:w-32 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
            </Link>
            <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-sm">
              Expert insights and{" "}
              <span className="text-white font-semibold">
                curated components
              </span>{" "}
              for the modern developer.
            </p>
          </div>
        </div>

        {/* Right Section: Form area */}
        <div className="w-full md:w-[60%] p-12 md:p-24 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Login to your account
            </h2>
            <p className="text-slate-500 mb-8">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Field with Eye Toggle */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none pr-12"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                  />
                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-slate-400">
                  Remember me
                </label>
              </div>

              {errors.general && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.general}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold transition-all shadow-lg active:scale-[0.98]"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

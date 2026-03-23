import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="h-24 border-b border-white/5 bg-[#030712]/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-full mx-auto h-full px-6 flex justify-between items-center">
        {/* Logo / App Name */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 group-hover:from-blue-400 group-hover:to-white transition-all duration-500">
            Stacky
          </span>
        </Link>

        {/* Search Bar (Optional but Pro) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search questions, tags, or users..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

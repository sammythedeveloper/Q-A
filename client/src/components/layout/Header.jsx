import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-20 px-6 flex justify-between items-center">
        {/* --- Logo & Brand --- */}
        <div className="flex gap-4 items-center group">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 group-hover:from-blue-400 group-hover:to-white transition-all duration-500">
              Stacky
            </div>
          </Link>
        </div>

        {/* --- Auth Actions --- */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <Button
                variant="tertiary"
                onClick={handleLogout}
                className="border-white/10 hover:bg-red-500/10 hover:text-red-400"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="hidden sm:block">
                <Button variant="tertiary">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="primary"
                  className="shadow-lg shadow-blue-600/20"
                >
                  Join Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

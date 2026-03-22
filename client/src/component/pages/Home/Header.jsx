import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Explore", href: "/explore-questions" },
  { name: "Resources", href: "#resources" },
];

export const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-20 px-6 flex justify-between items-center">
        
        {/* --- Logo & Brand --- */}
        <div className="flex gap-4 items-center group">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-9 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-300"></div>
            <span className="font-extrabold text-2xl tracking-tighter text-white">
              Stacky
            </span>
          </Link>
        </div>

        {/* --- Navigation --- */}
        <nav className="hidden lg:flex items-center h-full">
          {navItems.map(({ name, href }) => (
            <Link
              to={href}
              key={name}
              className="px-6 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase hover:text-white transition-colors"
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* --- Auth Actions --- */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Developer</p>
                <p className="text-sm font-semibold text-white">My Account</p>
              </div>
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
                <Button variant="primary" className="shadow-lg shadow-blue-600/20">
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
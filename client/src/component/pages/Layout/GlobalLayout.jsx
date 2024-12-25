import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Layout/Footer";
import About from "./About";
import Resources from "./Resource";

const GlobalLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <section className="min-h-screen flex flex-col">
      {/* Global Header */}
      <Header
        user={isAuthenticated ? { name: "user" } : null}
        onLogout={handleLogout}
      />
      {/* Main Content Area */}
      <main className="flex-grow">{children}</main>
      <About />
      <Resources />
      <Footer />
    </section>
  );
};

export default GlobalLayout;

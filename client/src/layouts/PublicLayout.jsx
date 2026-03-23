import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/layout/Header";
import Footer from "../components/ui/Footer";
import About from "../components/layout/About";
import Resources from "../components/layout/Resource";

// 1. Define the component
const PublicLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "User" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Redirect to my home after i logout
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712]">
      {/* 2. Use the Header and pass the props */}
      <Header user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. The "Marketing" Sections */}
      <About />
      <Resources />
      <Footer />
    </div>
  );
};

export default PublicLayout;
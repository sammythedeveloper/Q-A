import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Using useNavigate for programmatic navigation
import { motion } from "framer-motion";
import Header from "./Header";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Check if token is stored in localStorage
    const token = localStorage.getItem("token");

    // If there's no token, redirect to the login page
    if (!token) {
      setIsAuthenticated(false);
      navigate("/signin"); // Redirect to sign-in if no token
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // If not authenticated, return null or handle redirection inside useEffect
  if (!isAuthenticated) {
    return null;
  }

  // Handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to sign-in page after logout
    navigate("/signin");
  };

  return (
    <section className=" min-h-screen text-white font-sans flex flex-col ">
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 flex-grow ">
        <div className="container mx-auto px-6 text-center">
          <div className=" absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-blue-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]"></div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-heading font-extrabold mb-6 tracking-wide"
          >
            Welcome to Your Dashboard!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg mb-8 font-medium"
          >
            Ask questions, share knowledge, and connect with the brightest minds
            in development.
          </motion.p>
        </div>
        <div className="py-16 flex-grow ">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Ask Questions",
                  desc: " Want to ask a question? Click here! Get answers to your toughest questions.",
                  icon: "❓",
                  link: "/ask-question",
                },
                {
                  title: "Share Knowledge",
                  desc: " Want to give answers? Click here! Help others by sharing your expertise.",
                  icon: "🤝",
                  link: "/allQuestions",
                },
                {
                  title: "Build Connections",
                  desc: "Explore questions and see the community! Connect with developers worldwide.",
                  icon: "🌍",
                  link: "/explore-questions",
                },
              ].map((feature, index) => (
                <Link
                  key={index}
                  to={feature.link} // Use the 'link' property to specify the destination
                  className="p-6 bg-white text-black rounded-lg  hover:shadow-xl transition transform hover:-translate-y-2 font-body w-full" // Make the entire div clickable
                >
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6  text-black rounded-lg  hover:shadow-xl transition transform hover:-translate-y-2 font-body "
                  >
                    <h3 className="text-lg font-bold mb-2 flex items-center tracking-widest uppercase font-heading">
                      <span className="text-2xl mr-2">{feature.icon}</span>
                      {feature.title}
                    </h3>
                    <p className="text-xs tracking-widest font-body uppercase">
                      {feature.desc}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className=" text-white py-8 mt-10 border-t border-gray-300 bg-gradient-to-br from-transparent to-gray-800 ">
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
    </section>
  );
};

export default Dashboard;

import React from "react";
import DashboardHeader from "./DashboardHeader"; // We should build this next!
import About from "../components/layout/About";
import Resources from "../components/layout/Resource";
import Footer from "../components/ui/Footer";

const AppLayout = ({ children, handleLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712]">
      <DashboardHeader onLogout={handleLogout} />
      <main className="flex-grow p-6">{children}</main>
      <About />
      <Resources />
      <Footer />
    </div>
  );
};

export default AppLayout;

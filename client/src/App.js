import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// 1. Import the icons needed for the mission/stack data
import { Globe, Code2, Shield, Zap, Database, Cpu } from "lucide-react";

// Security
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AskPrivateRoute from "./routes/AskPrivateroute";

// Pages
import LandingPage from "./pages/Home/Landing";
import SignUp from "./pages/Auth/SignUp.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AllQuestionList from "./pages/Question/AllQuestionList.jsx";
import AskQuestion from "./pages/Question/AskQuestion.jsx";
import AnswerForm from "./pages/Answer/Answer.jsx";
// 2. Import the new ContentPage component
import ContentPage from "./pages/Content/ContentPage.jsx";
import ScrollToTop from "./layouts/ScrollToTop.jsx";

// --- DATA OBJECTS (The "Mission Page Data" I mentioned) ---
const missionData = {
  title: "The DNA",
  subtitle: "Engineering Growth",
  icon: Globe,
  content: `In an era of AI-generated code, the "Why" matters more than the "What." 

  Stacky was engineered to bridge the gap between junior curiosity and senior expertise. We aren't just building a forum; we're building a high-fidelity knowledge exchange for the next generation of Full-Stack Architects. 

  Our mission is to turn every "bug" into a Masterclass.`,
  features: [
    {
      name: "Architectural Integrity",
      icon: <Shield size={20} />,
      desc: "We prioritize deep-dive explanations over quick-fix snippets.",
    },
    {
      name: "Community-Driven Logic",
      icon: <Zap size={20} />,
      desc: "Built by a developer, for developers, with a focus on real-world scalability.",
    },
  ],
};

const stackData = {
  title: "The Toolbox",
  subtitle: "Our Stack",
  icon: Code2,
  content: `Stacky isn't just a website; it's a showcase of modern engineering. We've hand-picked a tech stack that balances raw performance with developer experience.`,
  features: [
    {
      name: "Frontend Architecture",
      icon: <Code2 size={20} />,
      desc: "React 18+, Framer Motion for fluidity, and Tailwind CSS for precision styling.",
    },
    {
      name: "Backend Protocol",
      icon: <Cpu size={20} />,
      desc: "Node Js and Express handles the heavy lifting and JWT for Authentication",
    },
    {
      name: "Persistent Layer",
      icon: <Database size={20} />,
      desc: "MySQL for relational data integrity and blazing fast query responses.",
    },
  ],
};

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        {/* 3. Updated About Page using the missionData */}
        <Route path="/about" element={<ContentPage {...missionData} />} />
        {/* 4. Updated Features Page using the stackData */}
        <Route path="/features" element={<ContentPage {...stackData} />} />
        <Route path="/community" element={<LandingPage />} />{" "}
        {/* Temporary redirect to landing */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* --- PRIVATE ROUTES --- */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/allQuestions"
          element={
            <PrivateRoute>
              <AllQuestionList />
            </PrivateRoute>
          }
        />
        <Route
          path="/ask-question"
          element={
            <AskPrivateRoute>
              <AskQuestion />
            </AskPrivateRoute>
          }
        />
        <Route
          path="/answerquestion"
          element={
            <PrivateRoute>
              <AnswerForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

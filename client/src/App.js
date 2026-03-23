import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Security
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AskPrivateRoute from "./routes/AskPrivateroute";

// Pages
import LandingPage from "./pages/Home/Landing";
import FeaturesPage from "./pages/Features/Features.jsx";
import CommunityPage from "./pages/Community/Community";
import SignUp from "./pages/Auth/SignUp.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AllQuestionList from "./pages/Question/AllQuestionList.jsx";
import AskQuestion from "./pages/Question/AskQuestion.jsx";
import AnswerForm from "./pages/Answer/Answer.jsx";

function App() {
  return (
    <Router basename="/">
      <Routes>
        
        {/* --- PUBLIC ROUTES --- */}
        {/* We removed <PublicLayout> here because it's already inside these pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* --- PRIVATE ROUTES --- */}
        {/* We removed <AppLayout> here because it's already inside these pages */}
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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./component/pages/Home/Landing.jsx";
import SignUp from "./component/pages/Sign/SignUp.jsx";
import SignIn from "./component/pages/Sign/SignIn.jsx";
import Dashboard from "./component/pages/Home/Dashboard.jsx";
import PrivateRoute from "./component/pages/Layout/PrivateRoute.jsx";
import AskPrivateRoute from "./component/pages/Layout/AskPrivateroute.jsx";
import AskQuestion from "./component/pages/Question/AskQuestion.jsx";
import AllQuestionList from "./component/pages/Question/AllQuestionList.jsx"; 
import AnswerForm from "./component/pages/Answer/Answer.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
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
        {/* Route for listing questions */}
        <Route
          path="/allQuestions"
          element={
            <PrivateRoute>
              <AllQuestionList />
            </PrivateRoute>
          }
        />
   {/* Route for Answering a Question */}
<Route
          path="/answerquestion"
          element={
            <PrivateRoute>
              <AnswerForm/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

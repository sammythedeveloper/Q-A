import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './component/pages/Home/Landing.jsx';
import SignUp from './component/pages/Sign/SignUp.jsx';
import SignIn from './component/pages/Sign/SignIn.jsx';
import Dashboard from './component/pages/Home/Dashboard.jsx';  // Import your Dashboard component
import PrivateRoute from './component/pages/Layout/PrivateRoute.jsx'  // Import PrivateRoute component
import AskPrivateRoute from './component/pages/Layout/AskPrivateroute.jsx';
import AskQuestion from './component/pages/Question/AskQuestion.jsx';  // Import AskQuestion component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Add protected route */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
           {/* Protected Route for Ask Question */}
           <Route 
          path="/ask-question" 
          element={
            <AskPrivateRoute>
              <AskQuestion/>
            </AskPrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

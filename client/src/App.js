import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './component/pages/Home/Landing.jsx';
import SignUp from './component/pages/Sign/SignUp.jsx';
import SignIn from './component/pages/Sign/SignIn.jsx';
import Dashboard from './component/pages/Home/Dashboard.jsx';  // Import your Dashboard component
import PrivateRoute from './component/pages/Home/PrivateRoute.jsx'  // Import PrivateRoute component

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
      </Routes>
    </Router>
  );
}

export default App;

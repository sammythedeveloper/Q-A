import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './component/pages/Home/Landing.jsx';
import SignUp from './component/pages/Sign/SignUp.jsx';
import SignIn from './component/pages/Sign/SignIn.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

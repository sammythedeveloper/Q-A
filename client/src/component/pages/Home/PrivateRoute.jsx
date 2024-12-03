import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if there is a token in localStorage
  const token = localStorage.getItem('token');

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If token exists, render the child component (i.e., Dashboard)
  return children;
};

export default PrivateRoute;

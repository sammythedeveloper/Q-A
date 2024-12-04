// component/pages/Home/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AskPrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is authenticated
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default AskPrivateRoute;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Navbar from "./Navbar";
import Reviews from "./pages/Reviews/Reviews";
import Registration from "./pages/Login/Registration";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRouter = ({ isAuthenticated, handleAuth }) => {
  const [currentUser, setCurrentUser] = useState('');

  // useEffect(() => {
  //   const username = localStorage.getItem('username');
  //   if (username) {
  //     setCurrentUser(username);
  //   }
  // }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login setAuth={handleAuth} />} />
        <Route path="/register" element={<Registration />} />
        
        <Route path="/Products" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="/Users" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/Reviews" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Reviews />
          </ProtectedRoute>
        } />
        <Route exact path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <>
              <Employees />
            </>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;

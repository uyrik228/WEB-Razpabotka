import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Navbar from "./Navbar";
import Reviews from "./pages/Reviews/Reviews";

const AppRouter = ({ isAuthenticated, handleAuth }) => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login setAuth={handleAuth} />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route exact path="/" element={
          isAuthenticated ? (
            <>
              <p>Welcome, {currentUser}!</p> {/* Приветственное сообщение */}
              <Employees />
            </>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;

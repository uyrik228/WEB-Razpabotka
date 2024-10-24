import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login/Login";

const AppRouter = ({ isAuthenticated, handleAuth, currentUser }) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={handleAuth} />} />
        <Route path="/" element={
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

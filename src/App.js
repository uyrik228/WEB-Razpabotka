import "./App.css";
import EmployeeAPI from "./api/service";
import EmployeeTable from "./EmployeeTable";
import Form from "./Form";
import Login from "./Login";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, Switch, FormControlLabel } from "@mui/material";

const initialEmployees = EmployeeAPI.all();

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAuth = (username) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const delEmp = (id) => {
    if (EmployeeAPI.delete(id)) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const addEmployee = (employee) => {
    const newEmployee = EmployeeAPI.add(employee);
    if (newEmployee) {
      setEmployees([...employees, newEmployee]);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
            label="Темная тема"
          />
          <Routes>
            <Route path="/login" element={<Login setAuth={handleAuth} />} />
            <Route path="/" element={
              isAuthenticated ? (
                <>
                  <p>Welcome, {currentUser}!</p> {/* Приветственное сообщение */}
                  <Form handleSubmit={addEmployee} inEmployee={{ name: "", surname: "", age: "" }} />
                  <EmployeeTable employees={employees} delEmployee={delEmp} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

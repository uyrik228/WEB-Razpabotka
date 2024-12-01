import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Switch, FormControlLabel } from "@mui/material";
import AppRouter from "./Router"; // Импортируем компонент Router
import { lightTheme, darkTheme } from "./theme";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAuth = (username) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <div className="App">
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
            label="Темная тема"
          />
          <AppRouter
            isAuthenticated={isAuthenticated}
            handleAuth={handleAuth}
            currentUser={currentUser}
          />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

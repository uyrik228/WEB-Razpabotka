import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const users = [
  { username: "admin", password: "password" },
  { username: "user1", password: "password1" },
  // Добавьте больше пользователей по необходимости
];

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const user = users.find((user) => user.username === username && user.password === password);
  //   if (user) {
  //     setAuth(username);
  //     navigate("/");
  //   } else {
  //     alert("Неверные данные для входа");
  //   }
  // };
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/auth/sign-in', {
              username: username,
              password: password
          });
          if (response.data.token) {
              localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
              localStorage.setItem('username', username);
              const decodedToken = jwtDecode(response.data.token);
              const role = decodedToken.role;
              localStorage.setItem('role', role);
              setAuth(response.data.token); // Обновляем состояние авторизации
              navigate("/");
          } else {
              alert("Неверные данные для входа");
          }
      } catch (error) {
          console.error("Ошибка при авторизации:", error);
          alert("Произошла ошибка при авторизации" + error);
      }
  };
  


  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Имя пользователя"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
      </Box>
    </Container>
  );
}

export default Login;

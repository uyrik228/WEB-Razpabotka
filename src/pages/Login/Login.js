import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';


const users = [
  { username: "admin", password: "password" },
  { username: "user1", password: "password1" },
  // Добавьте больше пользователей по необходимости
];

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(username, password)).then(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuth(token);
        navigate("/");
      } else {
        alert("Неверные данные для входа");
      }
    });
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
        <Typography variant="body2">
          Если вы еще не зарегистрированы, <Link to="/register">зарегистрируйтесь здесь</Link>.
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;

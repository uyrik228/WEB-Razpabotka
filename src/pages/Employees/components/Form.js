import React, { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Form = ({ handleSubmit, inEmployee }) => {
  const [employee, setEmployee] = useState(inEmployee);
  const [errors, setErrors] = useState({});
  const theme = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
    
    // Сброс ошибок при изменении значения
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleKeyPress = (event) => {
    // Запретить ввод цифр
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!employee.name) {
      newErrors.name = "Имя обязательно для заполнения";
    }
    if (!employee.surname) {
      newErrors.surname = "Фамилия обязательна для заполнения";
    }
    if (!employee.age) {
      newErrors.age = "Возраст обязателен для заполнения";
    } else if (employee.age <= 0) {
      newErrors.age = "Возраст должен быть положительным числом";
    }
    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleSubmit(employee);
    setEmployee(inEmployee);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ ...theme.components.MuiBox.styleOverrides.root }}
    >
      <TextField
        label="Name"
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        required
        variant="outlined"
        size="small"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Surname"
        type="text"
        name="surname"
        value={employee.surname}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        required
        variant="outlined"
        size="small"
        error={!!errors.surname}
        helperText={errors.surname}
      />
      <TextField
        label="Age"
        type="number"
        name="age"
        value={employee.age}
        onChange={handleChange}
        required
        variant="outlined"
        size="small"
        error={!!errors.age}
        helperText={errors.age}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default Form;
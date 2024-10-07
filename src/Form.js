// Form.js
import React, { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Box } from '@mui/material';
import theme from './themeForm';

const Form = ({ handleSubmit, inEmployee }) => {
  const [employee, setEmployee] = useState(inEmployee);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(employee);
    setEmployee(inEmployee);
  };

  return (
    <ThemeProvider theme={theme}>
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
          required
          variant="outlined"
          size="small"
        />
        <TextField
          label="Surname"
          type="text"
          name="surname"
          value={employee.surname}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
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
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Form;

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
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '1rem',
          border: '1px solid #c68282',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#aa2222',
        }}
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

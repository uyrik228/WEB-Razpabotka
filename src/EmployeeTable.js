import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import theme from './themeTable';

const EmployeeTable = ({ employees, delEmployee }) => {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.surname}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => delEmployee(employee.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default EmployeeTable;

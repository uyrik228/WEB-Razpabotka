import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">Employees</Button>
        <Button color="inherit" component={Link} to="/Products">Products</Button>
        <Button color="inherit" component={Link} to="/Users">Users</Button>
        <Button color="inherit" component={Link} to="/Reviews">Reviews</Button>
        <Button color="inherit" component={Link} to="/Login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
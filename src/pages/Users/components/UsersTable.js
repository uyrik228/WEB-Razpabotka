import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UsersTable = ({ isAdmin, delUser }) => {
  const [users, setUsers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8081/api/Users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8081/api/Users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      delUser(id); // Вызов функции удаления из родительского компонента
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            {isAdmin && (
              <>
                <TableCell>Удалить</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              {isAdmin && (
                <>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(user.id)}>
                      Удалить
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
};

export default UsersTable;
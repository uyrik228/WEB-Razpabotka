import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/actions/usersActions'; // Импортируем действие для получения пользователей
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UsersTable = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [editUser , setEditUser ] = React.useState(null);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditUser (user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser ((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    // Здесь вы можете добавить логику для обновления пользователя
    // Например, вызов действия для обновления пользователя
    // dispatch(updateUser (editUser ));
    setEditUser (null);
  };

  const handleDelete = (id) => {
    // Здесь вы можете добавить логику для удаления пользователя
    // Например, вызов действия для удаления пользователя
    // dispatch(deleteUser (id));
  };

  return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя пользователя</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
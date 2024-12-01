// src/redux/actions/userActions.js
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8081/api/Users', {
 headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

export const updateUser  = (user) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.put(`http://localhost:8081/api/Users/update`, user, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: user });
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
  }
};

export const deleteUser  = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:8081/api/Users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: id });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
};
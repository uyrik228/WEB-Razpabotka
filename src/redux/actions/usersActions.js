// src/redux/actions/userActions.js
import axiosInstance from '../../api/axiosInstance';

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_REQUEST' });
  try {
    const response = await axiosInstance.get('/Users');
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

export const updateUser  = (user) => async (dispatch) => {
  try {
    await axiosInstance.put('/Users/update', user);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: user });
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
  }
};

export const deleteUser  = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/Users/${id}`);
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: id });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
};
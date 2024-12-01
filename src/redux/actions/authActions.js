// src/redux/actions/authActions.js
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8081/auth/sign-in', {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: 'Неверные данные для входа' });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8081/auth/sign-up', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response ? error.response.data.message : error.message });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT' };
};
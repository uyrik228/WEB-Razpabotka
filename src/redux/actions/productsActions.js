// src/redux/actions/productActions.js
import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8081/api/Products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const addProduct = (product) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post('http://localhost:8081/api/Products/create', product, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.put(`http://localhost:8081/api/Products/update`, product, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    console.error('Ошибка при обновлении продукта:', error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:8081/api/Products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error);
  }
};
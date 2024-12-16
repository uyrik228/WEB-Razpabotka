// src/redux/actions/productActions.js
import axiosInstance from '../../api/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await axiosInstance.get('/Products');
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};


export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Products/create', product);
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      return rejectWithValue(error.response.data);
    }
  });

export const updateProduct = (product) => async (dispatch) => {
  try {
    await axiosInstance.put('/Products/update', product);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    console.error('Ошибка при обновлении продукта:', error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/Products/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error);
  }
};
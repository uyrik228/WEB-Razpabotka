// src/redux/actions/reviewActions.js
import axiosInstance from '../../api/axiosInstance';

export const fetchReviews = () => async (dispatch) => {
  dispatch({ type: 'FETCH_REVIEWS_REQUEST' });
  try {
    const response = await axiosInstance.get('/Reviews');
    dispatch({ type: 'FETCH_REVIEWS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_REVIEWS_FAILURE', payload: error.message });
  }
};

export const fetchUserReviews = (userId) => async (dispatch) => {
  dispatch({ type: 'FETCH_USER_REVIEWS_REQUEST' });
  try {
    const response = await axiosInstance.get(`/Reviews/UserReviews/${userId}`);
    dispatch({ type: 'FETCH_USER_REVIEWS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_REVIEWS_FAILURE', payload: error.message });
  }
};

export const addReview = (reviewData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/Reviews/create', reviewData);
    dispatch({ type: 'ADD_REVIEW', payload: response.data });
  } catch (error) {
    console.error('Ошибка при добавлении отзыва:', error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/Reviews/${id}`);
    dispatch({ type: 'DELETE_REVIEW', payload: id });
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error);
  }
};
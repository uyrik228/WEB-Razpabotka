// src/redux/actions/reviewActions.js
import axios from 'axios';

export const fetchReviews = () => async (dispatch) => {
  dispatch({ type: 'FETCH_REVIEWS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8081/api/Reviews', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'FETCH_REVIEWS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_REVIEWS_FAILURE', payload: error.message });
  }
};

export const fetchUserReviews = (userId) => async (dispatch) => {
    dispatch({ type: 'FETCH_USER_REVIEWS_REQUEST' });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8081/api/UserReviews/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch({ type: 'FETCH_USER_REVIEWS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_REVIEWS_FAILURE', payload: error.message });
    }
  };
  

export const addReview = (reviewData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:8081/api/Reviews/create', reviewData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_REVIEW', payload: response.data });
  } catch (error) {
    console.error('Ошибка при добавлении отзыва:', error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8081/api/Reviews/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'DELETE_REVIEW', payload: id });
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error);
  }
};
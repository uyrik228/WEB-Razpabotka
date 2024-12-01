// src/redux/reducers/reviewsReducer.js

const initialState = {
    reviews: [],
    loading: false,
    error: null,
  };
  
  const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_REVIEWS_REQUEST':
      case 'FETCH_USER_REVIEWS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_REVIEWS_SUCCESS':
        return { ...state, loading: false, reviews: action.payload };
      case 'FETCH_USER_REVIEWS_SUCCESS':
        return { ...state, loading: false, reviews: action.payload };
      case 'FETCH_REVIEWS_FAILURE':
      case 'FETCH_USER_REVIEWS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'ADD_REVIEW':
        return { ...state, reviews: [...state.reviews, action.payload] };
      case 'DELETE_REVIEW':
        return { ...state, reviews: state.reviews.filter(review => review.id !== action.payload) };
      default:
        return state;
    }
  };
  
  export default reviewsReducer;
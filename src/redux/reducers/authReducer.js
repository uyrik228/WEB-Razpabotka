// src/redux/reducers/authReducer.js
const initialState = {
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, token: action.payload, error: null };
      case 'LOGIN_FAILURE':
        return { ...state, error: action.payload };
      case 'REGISTER_SUCCESS':
        return { ...state, error: null }; // Можно добавить логику для успешной регистрации
      case 'REGISTER_FAILURE':
        return { ...state, error: action.payload };
      case 'LOGOUT':
        return { ...state, token: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
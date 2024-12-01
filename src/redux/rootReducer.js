import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import productsReducer from './reducers/productsReducer';
import reviewsReducer from './reducers/reviewsReducer';
import usersReducer from './reducers/usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  reviews: reviewsReducer,
  users: usersReducer,
});

export default rootReducer;
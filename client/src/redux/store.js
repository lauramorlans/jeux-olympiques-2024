import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketReducer';
import offersReducer from './offersReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    basket: basketReducer,
    offers: offersReducer,
    user: userReducer,
  },
});

export default store;
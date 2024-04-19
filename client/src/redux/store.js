import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
  },
});

export default store;
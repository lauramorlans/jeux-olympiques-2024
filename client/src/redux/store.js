import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketReducer';
import offersReducer from './offersReducer';
import ordersReducer from './ordersReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    basket: basketReducer,
    offers: offersReducer,
    orders: ordersReducer,
    user: userReducer,
  },
});

export default store;
import { instance } from './utils';

export const setOrders = (ordersData) => ({
  type: 'SET_ORDERS',
  payload: ordersData,
});

export const getOrders = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance().get('/orders', { params: { userId } });
      dispatch(setOrders(response.data));
    } catch (error) {
      return error?.response?.data?.message || 'Une erreur est apparue.';
    }
  };
};
import { instance } from './utils';

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await instance().get('/user');
      dispatch(setUser(response.data));
    } catch (error) {
      // Handle error
      console.error('Error fetching user:', error);
    }
  };
};

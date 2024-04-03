import { instance } from './utils';

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await instance().post('/login', { email, password });
      dispatch(setUser(response.data));
    } catch (error) {
      // Handle error
      console.error('Error log in:', error);
    }
  };
};

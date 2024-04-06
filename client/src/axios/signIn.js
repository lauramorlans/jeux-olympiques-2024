import { instance } from './utils';

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const signIn = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await instance().post('/login', { username, password });
      dispatch(setUser(response.data));
    } catch (error) {
      return error?.response?.data?.message || 'Une erreur est apparue.';
    }
  };
};

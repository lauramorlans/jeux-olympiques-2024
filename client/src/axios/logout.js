import { instance } from './utils';

export const unsetUser = (userData) => ({
  type: 'UNSET_USER',
});

export const logout = () => {
  return async (dispatch) => {
    try {
      await instance().get('/logout');
      dispatch(unsetUser());
    } catch (error) {
      // Handle error
      console.error('Error login out:', error);
    }
  };
};

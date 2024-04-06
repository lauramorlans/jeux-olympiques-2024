import { instance } from './utils';

export const postUser = async (username, firstname, lastname, email, password) => {
  try {
    const response = await instance().post('/user', { username, firstname, lastname, email, password });
    return response;
  } catch (error) {
    return error?.response?.data?.message || 'Une erreur est apparue.';
  }
};

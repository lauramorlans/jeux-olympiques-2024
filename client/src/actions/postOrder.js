import { instance } from './utils';

export const postOrder = async (userId) => {
  try {
    const response = await instance().post('/order', { userId });
    return response;
  } catch (error) {
    return error?.response?.data?.message || 'Une erreur est apparue.';
  }
};

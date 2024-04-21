import { instance } from './utils';

export const postOrder = async (userId, basket) => {
  try {
    const response = await instance().post('/order', { userId, basket });
    return response.data;
  } catch (error) {
    return error?.response?.data?.message || 'Une erreur est apparue.';
  }
};

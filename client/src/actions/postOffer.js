import { instance } from './utils';

export const postOffer = async ({ name, price, includedtickets, active }) => {
  try {
    const response = await instance().post('/offer', { name, price, includedtickets, active });
    return response;
  } catch (error) {
    return error?.response?.data?.message || 'Une erreur est apparue.';
  }
};

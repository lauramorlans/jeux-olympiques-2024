import { instance } from './utils';

export const postOffer = async ({ name, price, includedTickets, active }) => {
  try {
    const response = await instance().post('/offer', { name, price, includedTickets, active });
    return response;
  } catch (error) {
    return error?.response?.data?.message || 'Une erreur est apparue.';
  }
};

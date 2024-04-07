import { instance } from './utils';

export const editOffer = async ({ id, name, active }) => {
  try {
    const response = await instance().patch(`/offer/${id}`, { name, active });
    return response;
  } catch (error) {
    return error?.response?.data?.message || 'Une erreur est apparue.';
  }
};

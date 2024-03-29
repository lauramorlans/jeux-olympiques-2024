import { instance } from './utils';

export const getOffers = async () => {
  const response = await instance().get('/offers')

  return response.data;
}

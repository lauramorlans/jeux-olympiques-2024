import { instance } from './utils';

export const getOffers = async (active) => {
  const response = await instance().get('/offers', { params: active ? { active } : {} })

  return response.data;
}

import { instance } from './utils';

export const setActiveOffers = (offersData) => ({
  type: 'SET_ACTIVE_OFFERS',
  payload: offersData,
});

export const setAllOffers = (offersData) => ({
  type: 'SET_ALL_OFFERS',
  payload: offersData,
});

export const getOffers = (active) => {
  return async (dispatch) => {
    try {
      const response = await instance().get('/offers', { params: active ? { active } : {} });

      if (active) {
        dispatch(setActiveOffers(response.data));
      } else {
        dispatch(setAllOffers(response.data));
      }
    } catch (error) {
      return error?.response?.data?.message || 'Une erreur est apparue.';
    }
  };
};
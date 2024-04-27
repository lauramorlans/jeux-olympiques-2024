const initialState = {
  activeOffers: [],
  allOffers: [],
  hasRetrievedOffers: false,
};

export const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_OFFERS':
      return {
        ...state,
        activeOffers: action.payload,
        hasRetrievedOffers: true,
    };
    case 'SET_ALL_OFFERS':
      return {
        ...state,
        allOffers: action.payload,
        hasRetrievedOffers: true,
    };
    default:
      return state;
  }
};

export default offersReducer;
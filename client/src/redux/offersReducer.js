const initialState = {
    activeOffers: [],
    allOffers: [],
};

export const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_OFFERS':
      return {
        ...state,
        activeOffers: action.payload,
    };
    case 'SET_ALL_OFFERS':
      return {
        ...state,
        allOffers: action.payload,
    };
    default:
      return state;
  }
};

export default offersReducer;
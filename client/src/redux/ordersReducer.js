const initialState = {};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export default ordersReducer;
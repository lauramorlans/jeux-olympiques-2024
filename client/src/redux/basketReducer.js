const initialState = {};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BASKET':
      return action.payload;
    default:
      return state;
  }
};

export default basketReducer;
const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export default userReducer;
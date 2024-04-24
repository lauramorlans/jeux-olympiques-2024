import basketReducer from './basketReducer';

describe('Basket Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {};
    
    const newState = basketReducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it('should update basket state', () => {
    const initialState = {};
    const newState = { ofer1: 5, offer2: 2 };
    const action = { type: 'UPDATE_BASKET', payload: newState };
    
    const updatedState = basketReducer(initialState, action);

    expect(updatedState).toEqual(newState);
  });

  it('should not update state for unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    
    const updatedState = basketReducer(initialState, action);

    expect(updatedState).toEqual(initialState);
  });
});

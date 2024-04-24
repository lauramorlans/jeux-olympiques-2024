import userReducer from './userReducer';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {};
    const newState = userReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should set user', () => {
    const initialState = {};
    const newUser = { id: 1, name: 'John' };
    const action = { type: 'SET_USER', payload: newUser };
    const updatedState = userReducer(initialState, action);
    expect(updatedState).toEqual(newUser);
  });

  it('should unset user', () => {
    const initialState = { id: 1, name: 'John' };
    const action = { type: 'UNSET_USER' };
    const updatedState = userReducer(initialState, action);
    expect(updatedState).toEqual({});
  });

  it('should not modify state for unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    const updatedState = userReducer(initialState, action);
    expect(updatedState).toEqual(initialState);
  });
});

import ordersReducer from './ordersReducer';

describe('Orders Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {};
    const newState = ordersReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should set orders', () => {
    const initialState = {};
    const newOrders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    const action = { type: 'SET_ORDERS', payload: newOrders };
    const updatedState = ordersReducer(initialState, action);
    expect(updatedState).toEqual(newOrders);
  });

  it('should unset user', () => {
    const initialState = { id: 1, name: 'User' };
    const action = { type: 'UNSET_USER' };
    const updatedState = ordersReducer(initialState, action);
    expect(updatedState).toEqual({});
  });

  it('should not modify state for unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    const updatedState = ordersReducer(initialState, action);
    expect(updatedState).toEqual(initialState);
  });
});

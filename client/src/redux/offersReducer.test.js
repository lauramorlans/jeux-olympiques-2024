import offersReducer from './offersReducer';

describe('Offers Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      activeOffers: [],
      allOffers: [],
    };
    const newState = offersReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should set active offers', () => {
    const initialState = {
      activeOffers: [],
      allOffers: [],
    };
    const newActiveOffers = [{ name: 'offer1' }, { name: 'offer2' }];
    const action = { type: 'SET_ACTIVE_OFFERS', payload: newActiveOffers };
    const updatedState = offersReducer(initialState, action);
    expect(updatedState.activeOffers).toEqual(newActiveOffers);
    expect(updatedState.allOffers).toEqual(initialState.allOffers);
  });

  it('should set all offers', () => {
    const initialState = {
      activeOffers: [],
      allOffers: [],
    };
    const newAllOffers = [{ name: 'offer3' }, { name: 'offer4' }];
    const action = { type: 'SET_ALL_OFFERS', payload: newAllOffers };
    const updatedState = offersReducer(initialState, action);
    expect(updatedState.allOffers).toEqual(newAllOffers);
    expect(updatedState.activeOffers).toEqual(initialState.activeOffers);
  });

  it('should not modify state for unknown action', () => {
    const initialState = {
      activeOffers: [],
      allOffers: [],
    };
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    const updatedState = offersReducer(initialState, action);
    expect(updatedState).toEqual(initialState);
  });
});

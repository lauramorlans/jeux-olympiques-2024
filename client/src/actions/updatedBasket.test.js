import { updateBasket } from './updateBasket';

describe('updateBasket', () => {
  it('should create an action to update the basket', () => {
    const basket = { offerId: 1, offer2: 5 };
    const expectedAction = {
      type: 'UPDATE_BASKET',
      payload: basket,
    };
    expect(updateBasket(basket)).toEqual(expectedAction);
  });
});

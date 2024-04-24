import { postOrder } from './postOrder';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('postOrder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should post an order successfully', async () => {
    const userId = 'example_user_id';
    const basket = [{ id: 1, name: 'Product 1', price: 10 }, { id: 2, name: 'Product 2', price: 20 }];
    const responseData = { orderId: 1, userId, basket };
    const responseMock = { data: responseData };

    axios.post.mockResolvedValueOnce(responseMock);
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await postOrder(userId, basket);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledWith('/order', { userId, basket });
  });

  it('should handle error when posting an order', async () => {
    const userId = 'example_user_id';
    const basket = [{ id: 1, name: 'Product 1', price: 10 }, { id: 2, name: 'Product 2', price: 20 }];
    const errorMessage = 'Error posting order';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.post.mockRejectedValueOnce(errorResponse);
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await postOrder(userId, basket);

    expect(result).toEqual(errorMessage);
    expect(axios.post).toHaveBeenCalledWith('/order', { userId, basket });
  });
});

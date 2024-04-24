import { getOrders, setOrders } from './getOrders';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('getOrders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setOrders with response data', async () => {
    const userId = 'example_user_id';
    const ordersData = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    const responseMock = { data: ordersData };

    axios.get.mockResolvedValueOnce(responseMock);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    await getOrders(userId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setOrders(ordersData));
    expect(axios.get).toHaveBeenCalledWith('/orders', { params: { userId } });
  });

  it('should handle error when fetching orders', async () => {
    const userId = 'example_user_id';
    const errorMessage = 'Something went wrong';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.get.mockRejectedValueOnce(errorResponse);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await getOrders(userId)(dispatch);

    expect(result).toEqual(errorMessage);
    expect(dispatch).not.toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith('/orders', { params: { userId } });
  });
});

import { getUser, setUser } from './getUser';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('getUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setUser with response data', async () => {
    const userData = { id: 1, name: 'John Doe' };
    const responseMock = { data: userData };

    axios.get.mockResolvedValueOnce(responseMock);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    await getUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUser(userData));
    expect(axios.get).toHaveBeenCalledWith('/user');
  });

  it('should handle error when fetching user', async () => {
    const errorMessage = 'Error fetching user';
    const errorResponse = { message: errorMessage };

    axios.get.mockRejectedValueOnce(errorResponse);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    // Suppress console.error in the test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await getUser()(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching user:', errorResponse);

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});

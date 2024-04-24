import { logout, unsetUser } from './logout';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('logout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch unsetUser when logout is successful', async () => {
    const dispatch = jest.fn();

    axios.get.mockResolvedValueOnce();
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    await logout()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetUser());
    expect(axios.get).toHaveBeenCalledWith('/logout');
  });

  it('should handle error when logging out', async () => {
    const errorMessage = 'Error logging out';
    const errorResponse = { message: errorMessage };

    axios.get.mockRejectedValueOnce(errorResponse);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    // Suppress console.error in the test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await logout()(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error login out:', errorResponse);

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});

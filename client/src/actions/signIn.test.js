import { signIn, setUser } from './signIn';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('signIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setUser with response data when sign-in is successful', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const userData = { id: 1, username, email: 'test@example.com' };
    const responseMock = { data: userData };

    axios.post.mockResolvedValueOnce(responseMock);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    await signIn(username, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setUser(userData));
    expect(axios.post).toHaveBeenCalledWith('/login', { username, password });
  });

  it('should handle error when signing in', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const errorMessage = 'Error signing in';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.post.mockRejectedValueOnce(errorResponse);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await signIn(username, password)(dispatch);

    expect(result).toEqual(errorMessage);
    expect(dispatch).not.toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith('/login', { username, password });
  });
});

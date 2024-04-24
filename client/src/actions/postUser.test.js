import { postUser } from './postUser';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('postUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should post a user successfully', async () => {
    const username = 'testuser';
    const firstname = 'John';
    const lastname = 'Doe';
    const email = 'test@example.com';
    const password = 'testpassword';
    const userData = { id: 1, username, firstname, lastname, email };
    const responseMock = { data: userData };

    axios.post.mockResolvedValueOnce(responseMock);
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await postUser(username, firstname, lastname, email, password);

    expect(result).toEqual(responseMock);
    expect(axios.post).toHaveBeenCalledWith('/user', { username, firstname, lastname, email, password });
  });

  it('should handle error when posting a user', async () => {
    const username = 'testuser';
    const firstname = 'John';
    const lastname = 'Doe';
    const email = 'test@example.com';
    const password = 'testpassword';
    const errorMessage = 'Error posting user';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.post.mockRejectedValueOnce(errorResponse);
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await postUser(username, firstname, lastname, email, password);

    expect(result).toEqual(errorMessage);
    expect(axios.post).toHaveBeenCalledWith('/user', { username, firstname, lastname, email, password });
  });
});

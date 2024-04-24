import { postOffer } from './postOffer';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('postOffer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should post an offer successfully', async () => {
    const name = 'Test Offer';
    const price = 10;
    const includedtickets = 5;
    const active = true;
    const responseData = { id: 1, name, price, includedtickets, active };
    const responseMock = { data: responseData };

    axios.post.mockResolvedValueOnce(responseMock);
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await postOffer({ name, price, includedtickets, active });

    expect(result).toEqual(responseMock);
    expect(axios.post).toHaveBeenCalledWith('/offer', { name, price, includedtickets, active });
  });

  it('should handle error when posting an offer', async () => {
    const name = 'Test Offer';
    const price = 10;
    const includedtickets = 5;
    const active = true;
    const errorMessage = 'Error posting offer';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.post.mockRejectedValueOnce(errorResponse);
    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await postOffer({ name, price, includedtickets, active });

    expect(result).toEqual(errorMessage);
    expect(axios.post).toHaveBeenCalledWith('/offer', { name, price, includedtickets, active });
  });
});

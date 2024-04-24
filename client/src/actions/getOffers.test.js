import { getOffers, setActiveOffers, setAllOffers } from './getOffers';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('getOffers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setActiveOffers with response data when active is true', async () => {
    const active = true;
    const responseData = [{ id: 1, name: 'Offer 1' }, { id: 2, name: 'Offer 2' }];
    const responseMock = { data: responseData };

    axios.get.mockResolvedValueOnce(responseMock);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    await getOffers(active)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setActiveOffers(responseData));
    expect(axios.get).toHaveBeenCalledWith('/offers', { params: { active } });
  });

  it('should dispatch setAllOffers with response data when active is false', async () => {
    const active = false;
    const responseData = [{ id: 1, name: 'Offer 1' }, { id: 2, name: 'Offer 2' }];
    const responseMock = { data: responseData };

    axios.get.mockResolvedValueOnce(responseMock);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    await getOffers(active)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setAllOffers(responseData));
    expect(axios.get).toHaveBeenCalledWith('/offers', { params: {} });
  });

  it('should handle error when fetching offers', async () => {
    const active = true;
    const errorMessage = 'Something went wrong';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.get.mockRejectedValueOnce(errorResponse);
    const dispatch = jest.fn();

    const axiosInstanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(axiosInstanceMock);

    const result = await getOffers(active)(dispatch);

    expect(result).toEqual(errorMessage);
    expect(dispatch).not.toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith('/offers', { params: { active } });
  });
});

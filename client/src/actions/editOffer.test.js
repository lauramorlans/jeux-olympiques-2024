import { editOffer } from './editOffer';
import axios from 'axios';

jest.mock('axios');
jest.mock('./utils', () => ({
  instance: jest.fn(),
}));

describe('editOffer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should edit an offer successfully', async () => {
    const id = 'example_id';
    const name = 'New Name';
    const active = true;
    const responseData = { id, name, active };
    const responseMock = { data: responseData };

    axios.patch.mockResolvedValueOnce(responseMock);
    const instanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(instanceMock);

    const result = await editOffer({ id, name, active });

    expect(result).toEqual(responseMock);
    expect(axios.patch).toHaveBeenCalledWith(`/offer/${id}`, { name, active });
  });

  it('should handle error when editing an offer', async () => {
    const id = 'example_id';
    const name = 'New Name';
    const active = true;
    const errorMessage = 'Something went wrong';
    const errorResponse = { response: { data: { message: errorMessage } } };

    axios.patch.mockRejectedValueOnce(errorResponse);
    const instanceMock = jest.fn(() => axios);
    require('./utils').instance.mockImplementation(instanceMock);

    const result = await editOffer({ id, name, active });

    expect(result).toEqual(errorMessage);
    expect(axios.patch).toHaveBeenCalledWith(`/offer/${id}`, { name, active });
  });
});

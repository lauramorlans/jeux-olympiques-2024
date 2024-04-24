import axios from 'axios';
import { instance } from './utils';

describe('instance', () => {
  it('should create an axios instance with correct configuration', () => {
    const expectedBaseURL = process.env.REACT_APP_NODE_ENV === 'production' ?
      process.env.REACT_APP_BACKEND_URL : "http://localhost:8080";

    const expectedInstance = axios.create({
      baseURL: expectedBaseURL,
      withCredentials: true,
    });

    const actualInstance = instance();

    expect(actualInstance.defaults.baseURL).toEqual(expectedInstance.defaults.baseURL);
    expect(actualInstance.defaults.withCredentials).toEqual(expectedInstance.defaults.withCredentials);
  });
});

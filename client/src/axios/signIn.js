import { instance } from './utils';

export const signIn = async (email, password) => {
  try {
    const response = await instance().post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error; // Throw the error to be caught and handled outside of this function
  }
}

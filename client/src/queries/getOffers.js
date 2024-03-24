import axios from "axios";

export const getOffers = async () => {
  let baseURL = "";

  if (process.env.REACT_APP_NODE_ENV === 'production') {
    baseURL = `${process.env.REACT_APP_BACKEND_URL}`;
  } else {
    baseURL = "http://localhost:8080";
  }

  const instance = axios.create({
    baseURL: baseURL
  });

  const response = await instance.get('/offers')

  return response.data;
}

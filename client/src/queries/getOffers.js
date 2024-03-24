import axios from "axios";

export const getOffers = async () => {
  let baseURL = "";

  console.log('process.env.REACT_APP_NODE_ENV:', process.env.REACT_APP_NODE_ENV)

  // Check if running in development mode
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    console.log('1')
    baseURL = "http://localhost:8080"; // Your local Express server
  } else {
    // Set your production API URL here
    console.log('2')
    baseURL = `${window.location.protocol}//${window.location.hostname}`;
  }

  const instance = axios.create({
    baseURL: baseURL
  });

  const response = await instance.get('/offers')

  return response.data;
}

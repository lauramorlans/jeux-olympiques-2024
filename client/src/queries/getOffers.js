import axios from "axios";

export const getOffers = async () => {
  let baseURL = "";

  console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

  // Check if running in development mode
  if (process.env.NODE_ENV === "development") {
    console.log('hey')
    baseURL = "http://localhost:8080";
  } else {
    // Set your production API URL here
    console.log('yo')
    baseURL = `${window.location.protocol}//${window.location.hostname}`;
  }

  const instance = axios.create({
    baseURL: baseURL
  });

  const response = await instance.get('/offers')

  return response.data;
}

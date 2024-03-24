import axios from "axios";

export const getOffers = async () => {
  let baseURL = "";

  // Check if running in development mode
  if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:8080";
  }
  // else {
  //   // Set your production API URL here
  //   baseURL = "https://your-production-api-url.com";
  // }

  const instance = axios.create({
    baseURL: baseURL
  });

  const response = await instance.get('/offers')

  return response.data;
}

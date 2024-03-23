import axios from "axios";

export const getOffers = async () => {
  const response = await axios.create().get('http://localhost:8080/offers')

  return response.data;
}

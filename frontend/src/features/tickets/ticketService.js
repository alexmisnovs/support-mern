import axios from "axios";

const API_URL = "/api/v1/tickets";

//Create ticket

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};
//Login user

const getTicket = async userData => {
  const response = await axios.post(`${API_URL}/login`, userData);

  console.log(response.data);
  return response.data;
};

const authService = {
  createTicket,
  getTicket,
};

export default authService;

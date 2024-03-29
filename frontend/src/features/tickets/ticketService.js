import axios from "axios";

const API_URL = "/api/v1/tickets/";

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

const getAll = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// get ticket by id
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId, config);

  return response.data;
};

//close ticket

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    status: "closed",
  };
  const response = await axios.put(API_URL + ticketId, data, config);

  return response.data;
};

const authService = {
  createTicket,
  getAll,
  getTicket,
  closeTicket,
};

export default authService;

import axios from "axios";

const API_URL = "/api/v1/tickets/";

//Create note for a ticket

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "/notes", noteData, config);

  return response.data;
};

//Get notes for a ticket

const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

// // get ticket by id
// const getTicket = async (ticketId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(API_URL + ticketId, config);

//   return response.data;
// };

// //close ticket

// const closeTicket = async (ticketId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const data = {
//     status: "closed",
//   };
//   const response = await axios.put(API_URL + ticketId, data, config);

//   return response.data;
// };

const noteService = {
  getNotes,
  createNote,
};

export default noteService;

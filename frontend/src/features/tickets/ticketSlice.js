import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

// Get user from localstorage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create ticket
export const createTicket = createAsyncThunk("ticket/create", async (ticket, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await ticketService.createTicket(ticket, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// get user tickets
export const getTickets = createAsyncThunk("ticket/getAll", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await ticketService.getAll(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      //register cases
      .addCase(createTicket.pending, state => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //getTickets cases
      .addCase(getTickets.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;

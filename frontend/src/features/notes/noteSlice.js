import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

// Get user from localstorage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  notes: [],
  note: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create note
export const createNote = createAsyncThunk("notes/create", async (ticket, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await noteService.createNote(ticket, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// get user tickets
export const getNotes = createAsyncThunk("notes/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await noteService.getNotes(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const noteSlice = createSlice({
  name: "note",
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
      .addCase(createNote.pending, state => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.ticket = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //getTickets cases
      .addCase(getNotes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;

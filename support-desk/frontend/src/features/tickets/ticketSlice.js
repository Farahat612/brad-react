import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// Defining the initial state
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Creating an async thunk to handle create ticket requests
export const createTicket = createAsyncThunk(
  'ticket/create',
  // Defining the action to be dispatched
  async (ticketData, thunkAPI) => {
    try {
      // Getting the user token from the state
      const token = thunkAPI.getState().auth.user.token
      // Dispatching the createTicket action from the ticket service
      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Creating an async thunk to handle get tickets requests
export const getTickets = createAsyncThunk(
  'ticket/getAll',
  // Defining the action to be dispatched
  async (_, thunkAPI) => {
    try {
      // Getting the user token from the state
      const token = thunkAPI.getState().auth.user.token
      // Dispatching the getTickets action from the ticket service
      return await ticketService.getTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Creating an async thunk to handle get ticket by ID requests
export const getTicketById = createAsyncThunk(
  'ticket/getById',
  // Defining the action to be dispatched
  async (ticketId, thunkAPI) => {
    try {
      // Getting the user token from the state
      const token = thunkAPI.getState().auth.user.token
      // Dispatching the getTicketById action from the ticket service
      return await ticketService.getTicketById(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Creating a ticket slice to hold the user state
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handling the pending, fulfilled, and rejected cases for the createTicket async thunk
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      // Handling the pending, fulfilled, and rejected cases for the getTickets async thunk
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

// Exporting the ticket slice reducer as the default export
export default ticketSlice.reducer

// Exporting the reset action
export const { reset } = ticketSlice.actions

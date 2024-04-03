import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// Defining the initial state
const initialState = {
  tickets: [],
  ticket: {},
  isErrors: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Creating an async thunk to handle ticket creation
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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(createTicket.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(createTicket.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isSuccess = true
    //   state.message = action.payload.message
    // })
    // .addCase(createTicket.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.isErrors = true
    //   state.message = action.error.message
    // })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer

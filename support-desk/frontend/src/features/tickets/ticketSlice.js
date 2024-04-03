import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from '../../services/ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isErrors: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

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
  }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
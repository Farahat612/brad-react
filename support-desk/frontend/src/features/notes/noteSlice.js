import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import noteService from './noteService'

// Defining the initial state
const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Creating an async thunk to get notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      // Getting the user token from the state
      const token = thunkAPI.getState().auth.user.token
      // Dispatching the getNotes action from the noteService
      return await noteService.getNotes(ticketId, token)
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

// Creating a notes slice to hold the user state
const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // Reducer to reset the state
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handling the pending, fulfilled, and rejected cases for the getNotes async thunk
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

// Exporting the noteSlice reducer as the default export
export default noteSlice.reducer
// Exporting the reset action
export const { reset } = noteSlice.actions

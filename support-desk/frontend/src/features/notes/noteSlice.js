import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import noteService from '../../services/noteService'

// Defining the initial state
const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Creating a notes slice to hold the user state
const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // Reducer to reset the state
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
})

// Exporting the noteSlice reducer as the default export
export default noteSlice.reducer
// Exporting the reset action
export const { reset } = noteSlice.actions

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Defining the initial state
const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Creating an async thunk to handle user registration
export const register = createAsyncThunk(
  'auth/register',
  // Defining the action to be dispatched
  async (user, thunkAPI) => {
    try {
      // Dispatching the register action from the auth service
      return await authService.register(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Creating an async thunk to handle user login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
})

// Creating an auth slice to hold the user state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

// Exporting the auth slice reducer as the default export
export default authSlice.reducer

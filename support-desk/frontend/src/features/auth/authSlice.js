import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get User from local storage if it exists
const user = JSON.parse(localStorage.getItem('user'))

// Defining the initial state
const initialState = {
  user: user ? user : null,
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

// Creating an async thunk to handle user login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
})

// Creating an async thunk to handle user logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Creating an auth slice to hold the user state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // handling loading state while action is pending
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      // handling states when action is fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      // handling states when action is rejected
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
  },
})

// Exporting the auth slice reducer as the default export
export default authSlice.reducer

// Exporting the reset action
export const { reset } = authSlice.actions

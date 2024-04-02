import axios from 'axios'

// Defining API base URL
const API_URL = '/api/users'

// Registering a new user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logging out the user
const logout = () => {
  localStorage.removeItem('user')
}



// Creating an object to hold the auth service functions
const authService = {
  register,
  logout,
}

// Exporting the auth service object
export default authService
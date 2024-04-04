import axios from 'axios'

// Defining API base URL
const API_URL = '/api/tickets/'

// Getting all tickets
const getNotes = async (ticketId, token) => {
  // Setting the request headers with the user token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}${ticketId}/notes`, config)
  return response.data
}

// Creating an object to hold the ticket service functions
const noteService = {
  getNotes,
}

// Exporting the ticket service object
export default noteService

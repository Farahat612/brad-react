import axios from 'axios'

// Defining API base URL
const API_URL = '/api/tickets/'

// Getting all Notes for a ticket
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

// Creating a Note for a ticket
const createNote = async (ticketId, note, token) => {
  // Setting the request headers with the user token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(`${API_URL}${ticketId}/notes`, note, config)
  return response.data
}

// Creating an object to hold the ticket service functions
const noteService = {
  getNotes,
  createNote,
}

// Exporting the ticket service object
export default noteService

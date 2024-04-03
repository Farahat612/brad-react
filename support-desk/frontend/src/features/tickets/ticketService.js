import axios from 'axios'

// Defining API base URL
const API_URL = '/api/tickets/'

// Creating a new ticket
const createTicket = async (ticketData, token) => {
  // Setting the request headers with the user token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, ticketData, config)
  return response.data
}

// Creating an object to hold the ticket service functions
const ticketService = {
  createTicket,
}

// Exporting the ticket service object
export default ticketService

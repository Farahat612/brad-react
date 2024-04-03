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

// Getting all tickets
const getTickets = async (token) => {
  // Setting the request headers with the user token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// Getting a ticket by ID
const getTicketById = async (ticketId, token) => {
  // Setting the request headers with the user token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}${ticketId}`, config)
  return response.data
}

// Updating a ticket by ID

// Deleting a ticket by ID

// Creating an object to hold the ticket service functions
const ticketService = {
  createTicket,
  getTickets,
  getTicketById,
}

// Exporting the ticket service object
export default ticketService

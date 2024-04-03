const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const mongoose = require('mongoose')

// @desc: Get all user tickets
// @route: GET /api/tickets
// @access: Private
const getTickets = asyncHandler(async (req, res) => {
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user._id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Get all tickets of the logged in user
  const tickets = await Ticket.find({ user: req.user._id })
  // Send the tickets as response
  res.status(200).json(tickets)
})

// @desc: Create a new ticket
// @route: POST /api/tickets
// @access: Private
const createTicket = asyncHandler(async (req, res) => {
  // Get the product and description from the request body
  const { product, description } = req.body
  // Check if the product and description are not provided
  if (!product || !description) {
    res.status(400)
    throw new Error('Please provide a product and a description')
  }
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user._id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Create and save a new ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
  })
  // Send the created ticket as response
  res.status(201).json(ticket)
})

// @desc: Get a user ticket by ID
// @route: GET /api/tickets/:id
// @access: Private
const getTicketById = asyncHandler(async (req, res) => {
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user._id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Check if the ticket ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Invalid ticket ID')
  }
  // Get the ticket by ID
  const ticket = await Ticket.findById(req.params.id)
  // Check if the ticket doesn't exist
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  // Validate if the ticket belongs to the logged in user
  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Not authorized to view this ticket')
  }
  // Send the ticket as response
  res.json(ticket)
})

// @desc: Update a ticket
// @route: PUT /api/tickets/:id
// @access: Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user._id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Check if the ticket ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Invalid ticket ID')
  }
  // Get the product, description, and status from the request body
  const { product, description, status } = req.body
  // Check if the product and description are not provided
  if (!product && !description && !status) {
    res.status(400)
    throw new Error('Please provide a product and a description')
  }
  // Get the ticket by ID
  const ticket = await Ticket.findById(req.params.id)
  // Check if the ticket doesn't exist
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  // Validate if the ticket belongs to the logged in user
  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Not authorized to update this ticket')
  }
  // Update the ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  // Send the updated ticket as response
  res.json(updatedTicket)
})

// @desc: Delete a ticket
// @route: DELETE /api/tickets/:id
// @access: Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user._id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Check if the ticket ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Invalid ticket ID')
  }
  // Get the ticket by ID
  const ticket = await Ticket.findById(req.params.id)
  // Check if the ticket doesn't exist
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  // Validate if the ticket belongs to the logged in user
  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Not authorized to delete this ticket')
  }
  // Remove the ticket
  await Ticket.findByIdAndDelete(req.params.id)
  // Send an empty response
  res.status(200).json({ Success: true })
})

// Export the functions
module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
}

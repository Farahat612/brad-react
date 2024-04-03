const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

// @desc: Get all user tickets
// @route: GET /api/tickets
// @access: Private
const getTickets = asyncHandler(async (req, res) => {
  // const tickets = await Ticket.find({ user: req.user._id })
  // res.json(tickets)
  res.json({ message: 'Get all tickets' })
})

// @desc: Create a new ticket
// @route: POST /api/tickets
// @access: Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please provide all fields')
  }

  const ticket = new Ticket({
    product,
    description,
    user: req.user._id,
  })

  const createdTicket = await ticket.save()
  res.status(201).json(createdTicket)
})

// @desc: Get a ticket by ID
// @route: GET /api/tickets/:id
// @access: Private
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (ticket) {
    res.json(ticket)
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

// @desc: Update a ticket
// @route: PUT /api/tickets/:id
// @access: Private
const updateTicket = asyncHandler(async (req, res) => {
  const { product, description, status } = req.body

  const ticket = await Ticket.findById(req.params.id)

  if (ticket) {
    ticket.product = product
    ticket.description = description
    ticket.status = status

    const updatedTicket = await ticket.save()
    res.json(updatedTicket)
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

// @desc: Delete a ticket
// @route: DELETE /api/tickets/:id
// @access: Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (ticket) {
    await ticket.remove()
    res.json({ message: 'Ticket removed' })
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

// Export the functions
module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
}

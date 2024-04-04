const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const Note = require('../models/noteModel')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get all notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user.id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Check if the ticket ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.ticketId)) {
    res.status(400)
    throw new Error('Invalid ticket ID')
  }
  // Get the ticket by ID
  const ticket = await Ticket.findById(req.params.ticketId)
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

  // Get all notes for the ticket
  const notes = await Note.find({ ticket: req.params.ticketId })

  res.json(notes)
})

// @desc    Create a new note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  // Get the logged in user id in the JWT
  const user = await User.findById(req.user.id)
  // Check if the user exists
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  // Check if the ticket ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.ticketId)) {
    res.status(400)
    throw new Error('Invalid ticket ID')
  }
  // Get the ticket by ID
  const ticket = await Ticket.findById(req.params.ticketId)
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

  // Get the content, isStaff, and staffId from the request body
  const { content, isStaff, staffId } = req.body

  // Create a new note
  const note = await Note.create({
    user: req.user._id,
    ticket: req.params.ticketId,
    content,
    isStaff,
    staffId,
  })

  res.status(201).json(note)
})

module.exports = { getNotes, createNote }

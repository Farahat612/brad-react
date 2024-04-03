const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController')

// Tickets Routes
router.route('/').post(protect, createTicket)
router.route('/').get(protect, getTickets)
router.route('/:id').get(protect, getTicketById)
router.route('/:id').put(protect, updateTicket)
router.route('/:id').delete(protect, deleteTicket)

module.exports = router

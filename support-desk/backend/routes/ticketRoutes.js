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

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

// Tickets Routes
router.route('/').get(protect, getTickets).post(protect, createTicket)
router
  .route('/:id')
  .get(protect, getTicketById)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

module.exports = router

const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['product1', 'product2', 'product3'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

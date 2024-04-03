const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: [
        'iPhone',
        'iPad',
        'MacBook',
        'Apple Watch',
        'iMac',
        'AirPods',
        'Apple TV',
        'HomePod',
        'Mac Pro',
        'Mac Mini',
      ],
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

module.exports = mongoose.model('Ticket', ticketSchema)

const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Initialize Express
const app = express()

// Middleware
// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Error Handler Middleware
app.use(errorHandler)

// Routes
// Home Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Spport Desk system' })
})
// User Routes
app.use('/api/users', require('./routes/userRoutes'))


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

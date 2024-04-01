const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Home Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Spport Desk system' })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

// Error Handler Middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Spport Desk system' })
})


// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

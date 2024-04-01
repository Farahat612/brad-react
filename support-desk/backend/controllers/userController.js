const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc: Register a new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  // Destructuring the name, email, and password from the request body
  const { name, email, password } = req.body

  // @Validation: Check if the name, email, and password are provided
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide all fields')
  }

  // @Validation: Find if the user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10) // Generate a salt from bcrypt
  const hashedPassword = await bcrypt.hash(password, salt) // Hash the password with the salt

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // If the user is created successfully, return the user
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc: Login a user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login Route' })
})

module.exports = {
  registerUser,
  loginUser,
}

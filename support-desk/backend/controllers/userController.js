const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @Function: Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

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
      token: generateToken(user._id),
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
  // Destructuring the email and password from the request body
  const { email, password } = req.body

  // @Validation: Check if the email and password are provided
  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }

  // Find the user by email
  const user = await User.findOne({ email })

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password)

  // @Validation: Check if the user exists and the password is correct
  if (!user || !isMatch) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  // If the user is found and password is correct, return the user
  res.status(200).json({
    // could send back only the token but for now we are sending the user details as well
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
})

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Find the user by id
  const user = await User.findById(req.user._id) // req.user is set in the protect function in authMiddleware

  // If the user is found, return the user details
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

  // If the user is not found, return an error
  res.status(404)
})

// Exporting the functions to be used in the routes
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
}

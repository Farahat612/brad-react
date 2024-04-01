const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @Function: Protect the route
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check if the token is provided in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1] // splitted by space into an array and got the second element because the token is in the second element

      // Decode and verify the token --> to extract the id from the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get the user from the database and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password') // Excluded the password from the user object using the minus

      // Move to the next middleware
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  // Check if the token is not provided at the first place
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }

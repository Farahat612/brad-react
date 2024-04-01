const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// User Routes
router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile').get(protect, getUserProfile)

// Export the router
module.exports = router

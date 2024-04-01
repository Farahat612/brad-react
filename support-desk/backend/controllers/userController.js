// @desc: Register a new user
// @route: POST /api/users
// @access: Public
const registerUser = (req, res) => {
  res.json({ message: 'Register Route' })
}

// @desc: Login a user
// @route: POST /api/users/login
// @access: Public
const loginUser = (req, res) => {
  res.json({ message: 'Login Route' })
}

module.exports = {
  registerUser,
  loginUser,
}

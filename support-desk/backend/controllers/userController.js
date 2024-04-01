// @desc: Register a new user
// @route: POST /api/users
// @access: Public
const registerUser = (req, res) => {
  const { name, email, password } = req.body

  // @Validation: Check if the name, email, and password are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }


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

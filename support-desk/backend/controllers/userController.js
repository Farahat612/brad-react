const registerUser = (req, res) => {
  res.json({ message: 'Register Route' })
}

const loginUser = (req, res) => {
  res.json({ message: 'Login Route' })
}

module.exports = {
  registerUser,
  loginUser,
}

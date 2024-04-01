const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  res.json({ message: 'Register Route' })
})

router.post('/login', (req, res) => {
  res.json({ message: 'Login' })
})

module.exports = router

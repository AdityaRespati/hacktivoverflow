require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = (token) => {
  try {
    let data = jwt.verify(token, secret)
    return data
  } catch (error) {
    throw error
  }
}
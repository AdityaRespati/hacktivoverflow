const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username can't be empty"],
    validate: {
      isAsync: true,
        validator: (value, callback) => {
          User
            .findOne({
              username: value
            })
            .then(user => {
              if (user) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: "this username is taken. please use another username."
    }
  },
  email: {
    type: String,
    required: [true, "email can't be empty"],
    validate: [
      {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
        },
        msg: "invalid email format"
      },
      {
        isAsync: true,
        validator: (value, callback) => {
          User
            .findOne({
              email: value
            })
            .then(user => {

              if (user) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: "this email is taken. please use another email."
      }
    ]
  },
  password: {
    type: String,
    minlength: [6, "password must be at least 6 character long"],
    required: [true, "password can't be empty"]
  },
  role: {
    type: String,
    default: "user"
  }
})

UserSchema.pre('save', function (next) {
  var salt = bcrypt.genSaltSync(6)
  var hash = bcrypt.hashSync(this.password, salt)

  this.password = hash
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class userController {
  static register(req, res, next) {
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        let token = jwt.sign({
          email: user.email
        }, process.env.JWT_SECRET)

        res
          .status(201)
          .json({
            message: "registration success",
            data: user,
            token
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error",
            err
          })
      })
  }

  static login(req, res, next) {

    if (!req.body.email) {
      res
        .status(404)
        .json({
          message: "email can't be empty"
        })
    } else if (!req.body.password) {
      res
        .status(404)
        .json({
          message: "password can't be empty"
        })
    }

    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign({
              email: user.email
            }, process.env.JWT_SECRET)
            res
              .status(200)
              .json({
                message: "sign in success",
                access_token: token
              })
          } else {
            res
              .status(404)
              .json({
                message: "email/password not found"
              })
          }
        } else {
          res
            .status(404)
            .json({
              message: "email not registered"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error",
            err
          })
      })
  }
}


module.exports = userController
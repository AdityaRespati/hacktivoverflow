const Question = require('../models/Question')

class questionController {
  static create(req, res, next) {
    Question
      .create({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user._id
      })
      .then(question => {
        res
          .status(201)
          .json({
            msg: "create success",
            question
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "intenal server error",
            err
          })
      })
  }

  static findAll(req, res, next) {
    let query = {}

    if (req.query.q) {
      query = {
        title: {
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
        }
      }
    }

    Question
      .find(query)
      .then(questions => {
        res
          .status(200)
          .json({
            msg: "get data success",
            questions
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: "not found",
            err
          })
      })
  }

  static edit(req, res, next) {
    Question
      .findOne({ _id: req.params.id })
      .then(question => {
        if (question.createdBy.toString() == req.user._id.toString()) {
          Question
            .findOneAndUpdate(
              { _id: req.params.id },
              req.body,
              { new: true }
            )
            .then(updatedquestion => {
              res
                .status(200)
                .json({
                  msg: "update success",
                  updatedquestion
                })
            })
        } else {
          res
            .status(401)
            .json({
              msg: "you can't edit questions that aren't yours"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static upvote(req, res, next) {
    Question
      .findOne({ _id: req.params.id })
      .then(question => {
        var isUpvoter = false
        var isDownvoter = false
        var downvoterIndex = 0

        question.upvoters.forEach(upvoter => {
          if (upvoter.toString() == req.user._id.toString()) {
            isUpvoter = true
          }
        })

        question.downvoters.forEach((downvoter, index) => {
          if (downvoter.toString() == req.user._id.toString()) {
            isDownvoter = true
            downvoterIndex = index
          }
        })

        if (!isUpvoter) {
          if (isDownvoter) {
            question.downvote--
            question.downvoters.splice(downvoterIndex, 1)
          }

          question.upvote++
          question.upvoters.push(req.user._id)
          question.save()

          res
            .status(200)
            .json({
              msg: "upvote success",
              question
            })

        } else {
          res
            .status(400)
            .json({
              msg: "you alredy upvoted this question"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "intenal server error",
            err
          })
      })
  }

  static downvote(req, res, next) {
    Question
      .findOne({ _id: req.params.id })
      .then(question => {
        var isDownvoter = false
        var isUpvoter = false
        var upvoterIndex = 0

        question.downvoters.forEach(downvoter => {
          if (downvoter.toString() == req.user._id) {
            isDownvoter = true
          }
        })

        question.upvoters.forEach((upvoter, index) => {
          if (upvoter.toString() == req.user._id) {
            isUpvoter = true
            upvoterIndex = index
          }
        })

        if (!isDownvoter) {
          if (isUpvoter) {
            question.upvote--
            question.upvoters.splice(upvoterIndex, 1)
          }
          question.downvote++
          question.downvoters.push(req.user._id)
          question.save()

          res
            .status(200)
            .json({
              msg: "downvote success",
              question
            })

        } else {

          res
            .status(400)
            .json({
              msg: "you already downnvoted this question"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static delete(req, res, next) {
    Question
      .findOne({_id: req.params.id})
      .then(question => {
        if(question.createdBy.toString() == req.user._id.toString()){
          Question
          .findOneAndDelete({ _id: req.params.id })
          .then(question => {
            res
              .status(200)
              .json({
                msg: "delete success",
                question
              })
          })
        } else{
          res
            .status(401)
            .json({
              msg: "you can't delete someone else's question"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal serverv error",
            err
          })
      })
  }
}

module.exports = questionController
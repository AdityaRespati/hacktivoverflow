const Answer = require('../models/Answer')
const Question = require('../models/Question')

class answerController {
  static create(req, res, next) {
    var newAnswer = ""
    Answer
      .create({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user._id,
        questionId: req.params.questionId
      })
      .then(answer => {
        newAnswer = answer
        return Question
          .findById(answer.questionId)
      })
      .then(question => {
        question.answers.push(newAnswer._id)
        question
          .save()
        console.log(question)
      })
      .then(response => {
        res
          .status(201)
          .json({
            msg: "create success",
            response,
            newAnswer
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

  static findByQuestionId(req, res, next) {
    Answer
      .find({ questionId: req.params.questionId })
      .then(answers => {
        res
          .status(200)
          .json({
            msg: "get data success",
            answers
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
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        if (answer.createdBy.toString() == req.user._id.toString()) {
          Answer
            .findOneAndUpdate(
              { _id: req.params.id },
              req.body,
              { new: true }
            )
            .then(updatedanswer => {
              res
                .status(200)
                .json({
                  msg: "update success",
                  updatedanswer
                })
            })
        } else {
          res
            .status(401)
            .json({
              msg: "you can't edit answers that aren't yours"
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
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        var isUpvoter = false
        var isDownvoter = false
        var downvoterIndex = 0

        answer.upvoters.forEach(upvoter => {
          if (upvoter.toString() == req.user._id.toString()) {
            isUpvoter = true
          }
        })

        answer.downvoters.forEach((downvoter, index) => {
          if (downvoter.toString() == req.user._id.toString()) {
            isDownvoter = true
            downvoterIndex = index
          }
        })

        if (!isUpvoter) {
          if (isDownvoter) {
            answer.downvote--
            answer.downvoters.splice(downvoterIndex, 1)
          }

          answer.upvote++
          answer.upvoters.push(req.user._id)
          answer.save()

          res
            .status(200)
            .json({
              msg: "upvote success",
              answer
            })

        } else {
          res
            .status(400)
            .json({
              msg: "you alredy upvoted this answer"
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
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        var isDownvoter = false
        var isUpvoter = false
        var upvoterIndex = 0

        answer.downvoters.forEach(downvoter => {
          if (downvoter.toString() == req.user._id) {
            isDownvoter = true
          }
        })

        answer.upvoters.forEach((upvoter, index) => {
          if (upvoter.toString() == req.user._id) {
            isUpvoter = true
            upvoterIndex = index
          }
        })

        if (!isDownvoter) {
          if (isUpvoter) {
            answer.upvote--
            answer.upvoters.splice(upvoterIndex, 1)
          }
          answer.downvote++
          answer.downvoters.push(req.user._id)
          answer.save()

          res
            .status(200)
            .json({
              msg: "downvote success",
              answer
            })

        } else {

          res
            .status(400)
            .json({
              msg: "you already downnvoted this answer"
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
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        if (answer.createdBy.toString() == req.user._id.toString()) {
          Answer
            .findOneAndDelete({ _id: req.params.id })
            .then(answer => {
              res
                .status(200)
                .json({
                  msg: "delete success",
                  answer
                })
            })
        } else {
          res
            .status(401)
            .json({
              msg: "you can't delete someone else's answer"
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

module.exports = answerController
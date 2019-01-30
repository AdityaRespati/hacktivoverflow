const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  title: String,
  description: String, 
  upvote: {
    type: Number,
    default: 0
  },
  downvote: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  upvoters: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  downvoters: [{
    type: Schema.Types.ObjectId,
    ref: "User" 
  }],
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Answer"
  }
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer
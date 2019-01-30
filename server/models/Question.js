const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "title can't be empty"]
  }, 
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
  answers: [{
    type: Schema.Types.ObjectId,
    ref: "Answer"
  }]
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
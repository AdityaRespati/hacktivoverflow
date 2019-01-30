var express = require('express');
var router = express.Router();
var usersRoute = require('../routes/users');
var questionRoute = require('../routes/questions')
var answerRoute = require('../routes/answer')

router.use('/users', usersRoute);
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)

module.exports = router;

var express = require('express')
var router = express.Router()
var answerController = require('../controllers/answerController')
var isLogin = require('../middlewares/isLogin') 

router.use(isLogin)

router.post('/:questionId', answerController.create)
router.get('/:questionId', answerController.findByQuestionId)
router.put('/upvote/:id', answerController.upvote)
router.put('/downvote/:id', answerController.downvote)
router.put('/:id', answerController.edit)
router.delete('/:id', answerController.delete)

module.exports = router
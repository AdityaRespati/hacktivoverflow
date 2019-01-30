const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')
const isLogin = require('../middlewares/isLogin')

router.use(isLogin)

router.post('/', questionController.create)
router.get('/', questionController.findAll)
router.put('/upvote/:id', questionController.upvote)
router.put('/downvote/:id', questionController.downvote)
router.get('/search', questionController.findAll)
router.put('/:id', questionController.edit)
router.delete('/:id', questionController.delete)

module.exports = router 
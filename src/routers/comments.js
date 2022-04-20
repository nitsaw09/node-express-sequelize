const commentController = require('../controllers/comments.controller')
const express = require('express');

const router = express.Router();

router.post('/', commentController.createComment);

router.put('/:commentId', commentController.updateComment);

router.delete('/:commentId', commentController.deleteComment);

module.exports = router;

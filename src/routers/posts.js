const postController = require('../controllers/posts.controller')
const express = require('express');

const router = express.Router();

router.get('/', postController.getPosts);

router.get('/:postId', postController.findPost);

router.post('/', postController.createPost);

router.put('/:postId', postController.updatePost);

router.delete('/:postId', postController.deletePost);

module.exports = router;

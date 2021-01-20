const express = require('express')
const { getPosts, createPost, updatedPost, deletePost, likePost } = require('../controllers/posts')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatedPost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

module.exports = router
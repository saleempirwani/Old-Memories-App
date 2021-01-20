const PostMessage = require('../models/postMessage')
const mongoose = require('mongoose')
const { post } = require('../routes/posts')

const getPosts = async(req, res) => {
    try {
        const PostMessages = await PostMessage.find()
        return res.status(200).json(PostMessages)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const createPost = async(req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;
    const newPost = new PostMessage({ title, message, selectedFile, creator, tags })
        // console.log(newPost)
    try {
        await newPost.save()
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

const updatedPost = async(req, res) => {
    const { id: _id } = req.params
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatedPost = await PostMessage.findByIdAndUpdate(
        _id, post, { new: true })

    res.json(updatedPost)
}

const deletePost = async(req, res) => {
    const { id } = req.params
        // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post deleted successfully' })
}

const likePost = async(req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate(
        _id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost)
}

module.exports = {
    getPosts,
    createPost,
    updatedPost,
    deletePost,
    likePost
}
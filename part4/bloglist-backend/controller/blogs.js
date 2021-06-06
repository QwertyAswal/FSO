const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', middleware.userExtractor, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('blogs', { title: 1, author: 1 })
        res.json(user.blogs)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.post('/', middleware.userExtractor, async (req, res, next) => {
    try {
        const body = req.body
        if (!body.author || !body.title)
            return res.status(400).json({ error: 'Author and title required' })

        const user = req.user

        const blog = new Blog({
            author: body.author,
            title: body.title,
            url: body.url ? body.url : '',
            likes: body.likes ? (isNaN(Number(body.likes)) ? 0 : Number(body.likes)) : 0,
            user: user._id
        })
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.status(201).json(savedBlog)
    }
    catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
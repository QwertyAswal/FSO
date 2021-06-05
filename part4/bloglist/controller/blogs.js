const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, id: 1, name: 1 })
        res.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        if (!body.author || !body.title)
            return res.status(400).json({ error: 'Author and title required' })

        const users = await User.find({})

        const user = users[parseInt(Math.random() * users.length)]

        const blog = new Blog({
            author: body.author,
            title: body.title,
            url: body.url | '',
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
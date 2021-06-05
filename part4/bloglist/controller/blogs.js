const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = Blog.find({})
        response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(result)
    }
    catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
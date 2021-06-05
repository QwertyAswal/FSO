const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1, id: 1 })
        res.json(users)
    }
    catch (error) {
        next(error)
    }
})

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        if (!body.password || !body.username || !body.name)
            return res.status(400).json({ error: 'password name and username required' })
        if (body.password.length < 3 || body.username.length < 3)
            return res.status(400).json({ error: 'password and username length must be greater than 3' })
        const passwordHash = await bcrypt.hash(body.password, 10)
        const user = new User({
            name: body.name,
            username: body.username,
            blogs: [],
            passwordHash
        })
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    }
    catch (error) {
        next(error)
    }
})

module.exports = userRouter
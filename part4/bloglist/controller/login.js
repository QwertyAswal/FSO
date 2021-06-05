const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res, next) => {
    const body = req.body
    if (!body.username, !body.password)
        return res.status(400).json({ error: 'username and password required' })
    try {
        const user = await User.findOne({ username: body.username })
        const passwordCheck = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
        if (!user || !passwordCheck)
            return res.status(400).json({ error: 'username or password incorrect' })
        const payload = {
            username: user.username,
            name: user.name,
            id: user._id
        }
        const token = await jwt.sign(payload, config.SECRET, {
            expiresIn: 60 * 30
        })
        res.status(201).json({ token, name: user.name, username: user.username })
    } catch (err) {
        next(err)
    }
})

module.exports = loginRouter
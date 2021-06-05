const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(middleware.getTokenFrom)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

module.exports = app
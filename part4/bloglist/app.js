const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorhandler = require('./utils/middleware').errorHandler
const blogsRouter = require('./controller/blogs')
const userRouter = require('./controller/users')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

app.use(errorhandler)

module.exports = app
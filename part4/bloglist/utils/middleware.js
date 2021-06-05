const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('./config')

const errorHandler = (error, req, res, next) => {
	logger.error(error)
	return res.status(500).json({ error })
}

const getTokenFrom = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7)
	}
	next()
}

const userExtractor = async (req, res, next) => {
	try {
		if (!req.token)
			return res.status(401).json({ error: 'token missing ' })
		const jwtData = jwt.verify(req.token, config.SECRET)
		if (!jwtData)
			return res.status(401).json({ error: 'token invalid' })

		const user = await User.findById(jwtData.id)
		req.user = user
		next()
	}
	catch (err) {
		next(err)
	}

}

module.exports = {
	errorHandler,
	getTokenFrom,
	userExtractor
}
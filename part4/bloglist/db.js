const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')


mongoose.connect(config.MONGODB_URI, {
	useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
	logger.info(`Connected to db: ${config.MONGODB_URI}`)
}).catch((err) => {
	logger.error(`Error connecting to db: ${err}`)
})


const logger = require('../utils/logger')

const errorHandler = (error, req, res, next) => {
    logger.error(error)
    return res.status(500).json({ error })
}

module.exports = {
    errorHandler
}
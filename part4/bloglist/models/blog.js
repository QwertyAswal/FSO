const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedValue) => {
        returnedValue.id = returnedValue._id.toString()
        delete returnedValue._id
        delete returnedValue.__v
    }
})

module.exports = mongoose.model('blog', blogSchema)
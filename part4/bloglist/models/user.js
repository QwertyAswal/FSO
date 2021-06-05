const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		unique: true,
		type: String,
		required: true,
		minLength: 3
	},
	name: {
		type: String,
		required: true
	},
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'blog'
		}
	]
})

userSchema.set('toJSON', {
	transform: (document, returnedValue) => {
		returnedValue.id = returnedValue._id.toString()
		delete returnedValue._id
		delete returnedValue.__v
		delete returnedValue.passwordHash
	}
})

module.exports = mongoose.model('user', userSchema)
require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to database')

mongoose.connect(url, {
	useCreateIndex: true,
	useFindAndModify: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then((result) => {
	console.log('Connected Successfully')
}).catch((err) => {
	console.log('Error connecting to database')
})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 3
	},
	number: {
		type: String,
		required: true,
		minLength: 8
	}
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
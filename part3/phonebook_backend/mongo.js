const mongoose = require('mongoose')

const url = `mongodb+srv://taskapp:${process.argv[2]}@cluster0.yl1ow.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

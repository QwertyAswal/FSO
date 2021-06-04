require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))


morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/info', (req, res) => {
    const data = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    res.send(data)
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }).catch(err => {
        next(err)
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        res.status(201).json(savedPerson)
    }).catch(err => {
        next(err)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person)
            res.json(person)
        else
            res.status(404).end()
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    if (!body.name || !body.number)
        return res.status(401).json({ err: 'name and number required' })
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person).then(updated => {
        res.json(person)
    }).catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    res.status(400).json({ err })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
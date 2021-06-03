const express = require('express')

const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/info', (req, res) => {
    const data = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    res.send(data)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person)
        return res.status(404).end()
    return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const generateId = () => {
    return parseInt(Math.random() * 10000)
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name && body.number) {
        const person = {
            name: body.name,
            number: body.number,
            id: generateId()
        }
        persons = persons.concat(person)
        return res.status(201).json(person)
    }
    return res.status(400).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
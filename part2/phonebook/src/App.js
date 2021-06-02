import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)


  const addPerson = (event) => {
    event.preventDefault()
    const copyPerson = persons.find(person => person.name === newName)
    if (copyPerson)
      alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setPersonsToShow(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    setFilterText('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => {
    const personsToShowObject = persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setFilterText(event.target.value)
    setPersonsToShow(personsToShowObject)
  }

  const generateContacts = personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with a: <input value={filterText} onChange={handleFilterChange} placeholder='filter...' />
      </div>
      <h2>add a person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} placeholder='a new name...' />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} placeholder='a new number...' />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {generateContacts}
    </div>
  )
}

export default App
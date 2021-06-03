import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')


  useEffect(() => {
    phonebookService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const copyPerson = persons.find(person => person.name === newName)
    if (copyPerson)
      alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(personObject))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilterText(event.target.value)

  const personsToShow = () => {
    return persons.filter(person => person.name.toLowerCase().startsWith(filterText.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <h2>Add a new </h2>
      <PersonForm addPerson={addPerson} newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow()} />
    </div>
  )
}

export default App
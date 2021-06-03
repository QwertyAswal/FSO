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
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (copyPerson) {
      if (personObject.number === copyPerson.number)
        alert(`${newName} is already added to phonebook`)
      else {
        const toChange = window.confirm(`${copyPerson.name} already added to phonebook, replace old number with new one?`)
        if (toChange) {
          personObject.id = copyPerson.id
          phonebookService
            .update(personObject.id, personObject)
            .then(data => {
              setPersons(persons.map(p => p.id === data.id ? data : p))
            })
        }
      }
    }
    else {
      phonebookService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilterText(event.target.value)
  const personsToShow = () => persons.filter(person => person.name.toLowerCase().startsWith(filterText.toLowerCase()))

  const deleteHandler = (person) => {
    const toDelete = window.confirm(`Delete ${person.name}?`)
    if (toDelete)
      phonebookService
        .remove(person.id)
        .then(data => {
          setPersons(persons.filter(p => {
            return p.id !== person.id
          }))
        })
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
      {personsToShow().map(person => <Numbers key={person.id} person={person} deleteHandler={() => deleteHandler(person)} />)}
    </div>
  )
}

export default App
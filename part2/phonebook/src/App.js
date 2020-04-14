import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Details from './components/Details'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.filter(person => person.name === newName).length > 0

    if (personExists) {
      const person = persons.filter(person => person.name === newName)[0]

      const confirm = window.confirm(`Change ${person.name} number to ${newNumber}?`)

      if (!confirm) { return null }

      phonebookService.update(person, newNumber)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.name === updatedPerson.name ? updatedPerson : person))
        })
    }
    else {

      phonebookService.create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }

    setNewName('')
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase()
    if (filterText.length > 0) {
      console.log(filterText)
      setFilter(filterText)
      setShowAll(false)
    }
    else {
      setShowAll(true)
    }
  }

  const deleteHandler = (id) => {
    const personToDelete = persons.filter(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete[0].name}?`)
    if (confirmDelete) {
      phonebookService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} />

      <h3>Add Person and Number</h3>

      <PersonForm
        nameValue={newName} nameChangeHandler={handleNameChange}
        numberValue={newNumber} numberChangeHandler={handleNumberChange}
        clickHandler={addPerson}
      />

      <h2>Numbers </h2>
      {personsToShow.map(person =>
        <Details key={person.name} person={person} deleteHandler={deleteHandler} />
      )}
    </div>
  )
}

export default App
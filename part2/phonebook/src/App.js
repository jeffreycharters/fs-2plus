import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Details from './components/Details'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPersons, setShowPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShowPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    axios.post('http://localhost:3001/persons', personObject)


    const namePresent = persons.filter(person => {
      return person.name === personObject.name
    })

    if (namePresent.length > 0) {
      return (
        alert(`${personObject.name} is already in the phonebook!`)
      )
    } else {
      setPersons(persons.concat(personObject))
      setShowPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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
      const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterText))
      setShowPersons(filteredPersons)
    }
    else {
      setShowPersons(persons)
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
      {showPersons.map(person =>
        <Details key={person.name} person={person} />
      )}
    </div>
  )
}

export default App
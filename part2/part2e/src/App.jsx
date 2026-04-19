import { useState, useEffect } from 'react'
import SearchBar from './components/Search'
import Form from './components/Form'
import Notification from './components/Notification'
import './components/Notification.css'
import requestService from './services/requestService'

const App = () => {
  const [filterTerm, setFilterTerm] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    requestService.getAll()
      .then(initialPeople => setPersons(initialPeople))
  }, [])

  const showNotification = (message, type = 'success', timeout = 5000) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, timeout)
  }

  const handleInputSearchBar = (event) => setFilterTerm(event.target.value)
  const handleInputPerson = (event) => setNewPerson(event.target.value)
  const handleInputNumber = (event) => setNewNumber(event.target.value)

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newPerson, number: newNumber }
    const hasName = persons.some(person => person.name === newPerson)

    if (hasName) {
      if (window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(p => p.name === newPerson)
        const updatedPerson = { ...personToUpdate, number: newNumber }
        requestService.updateNumber(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            console.log('updated person:', returnedPerson)
            setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
            showNotification(`Updated ${newPerson}'s number`, 'success')
            setNewPerson('')
            setNewNumber('')
          })
          .catch(() => {
            showNotification(`The person '${newPerson}' was already deleted from the server.`, 'error')
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
          })
      }
    } else {
      requestService.create(personObject)
        .then(newPersonInfo => {
          setPersons(persons.concat(newPersonInfo))
          showNotification(`Added ${newPerson}`, 'success')
          setNewPerson('')
          setNewNumber('')
        })
        .catch(() => {
          showNotification(`Failed to add ${newPerson}. Please try again.`, 'error')
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      requestService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(() => {
          showNotification(`The person '${person.name}' was already deleted from the server.`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h1>Petu's Phonebook</h1>
      <Notification message={notification} type={notificationType} />
      <div>Search <input value={filterTerm} onChange={handleInputSearchBar}/></div>
      <h3>Add Number</h3>
      <Form
        addNewPerson={addNewPerson}
        newPerson={newPerson}
        newNumber={newNumber}
        handleInputNumber={handleInputNumber}
        handleInputPerson={handleInputPerson}
      />
      <h3>Numbers</h3>
      <SearchBar persons={persons} filterTerm={filterTerm} handleDelete={handleDelete} />
    </div>
  )
}

export default App
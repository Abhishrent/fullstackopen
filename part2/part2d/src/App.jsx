import { useState, useEffect } from 'react'
import SearchBar from './components/Search'
import Form from './components/Form'
import requestService from './services/requestService'

const App = () => {

  const [filterTerm, setFilterTerm] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  
  //fetching data from the json-server
  useEffect(() => {
    console.log('useEffect called')
    requestService.getAll()
    .then(initialPeople => setPersons(initialPeople))
 }, [])

  const handleInputSearchBar = (event) => {
    console.log('filter input field updated to', event.target.value)
    setFilterTerm(event.target.value) 
  }
  const handleInputPerson = (event) => {
    console.log('name input field updated to', event.target.value)
    setNewPerson(event.target.value)
  }

  const handleInputNumber = (event) => {
    console.log('number input field updated to', event.target.value)
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber 
    }

    const hasName = persons.some(person => person.name === newPerson)
    if(hasName) {
      alert(`${newPerson} already in list!!!`)
    }else{
      requestService.create(personObject)
      .then(newPersonInfo => {
        setPersons(persons.concat(newPersonInfo))
      })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      requestService.remove(id)
        .then((response) => {
          console.log('server delete response:', response)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`The person '${person.name}' was already deleted from the server.`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }


  return (
    <div>
        <h1>Petu's Phonebook</h1>
        <div>
          Search <input value={filterTerm} onChange={handleInputSearchBar}/>
        </div>
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

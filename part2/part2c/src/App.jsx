import { useState, useEffect } from 'react'
import SearchFilter from './components/Search'
import Form from './components/Form'
import axios from 'axios'

const App = () => {

  //fetching data from the json-server
  useEffect(() => {
    console.log('useEffect called')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [filterTerm, setFilterTerm] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])


  const handleInputFilter = (event) => {
    console.log('filter input field updated to', event.target.value)
    setFilterTerm(event.target.value) 
  }
  const handleInputPerson = (event) => {
    console.log('name input field update to', event.target.value)
    setNewPerson(event.target.value)
  }

  const handleInputNumber = (event) => {
    console.log('number input field updated to', event.target.value)
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: String(persons.length + 1),
      name: newPerson,
      number: newNumber 
    }

    const hasName = persons.some(person => person.name === newPerson)

    if(hasName) {
      alert(`${newPerson} already in list!!!`)
    }else{
    setPersons(persons.concat(personObject))
    console.log('new person added')
    }
  }
  
  return (
    <div>
        <h1>Petu's Phonebook</h1>
        <div>
          Search <input value={filterTerm} onChange={handleInputFilter}/>
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
        <SearchFilter persons={persons} filterTerm={filterTerm} />
    </div>
  )
}
export default App

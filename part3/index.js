const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const entryCount = persons.length
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${entryCount} people </p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
 response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const error = {"error": "name or number missing"}
  if (!body.name || !body.number) {
    return response.status(400).json(error)
  }
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({"error": "name already in phonebook"})
  }
  const id = Math.round(Math.random() * 100000000000)
  const newPerson = {'id': id, 'name': body.name, 'number': body.number}
  //console.log('new entry: ', newPerson)
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(person => person.id !== request.params.id)
  console.log('delete request invoked')
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {console.log(`app listening in port ${PORT}`)})

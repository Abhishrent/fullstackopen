import Numbers from './Numbers'

const SearchBar = ({persons, filterTerm, handleDelete}) => {
  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))

  return (
      <ul>
      {filteredPeople.map(number => (
        <Numbers key={number.id} number={number} handleDelete={handleDelete} />
      ))} 
      </ul>
  )
}

  export default SearchBar

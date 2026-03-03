import Numbers from './Numbers'

const SearchFilter = ({persons, filterTerm}) => {
  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))

  return (
      <ul>
      {filteredPeople.map(number => <Numbers key={number.id} number={number}/>)} 
      </ul>
  )
}

  export default SearchFilter

const Numbers = ({ number, handleDelete }) => {
  return (
    <li>
      {number.name} {number.number} 
      <button onClick={() => handleDelete(number.id)}>delete</button>
    </li>
  )
}

export default Numbers

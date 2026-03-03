const Form = ({addNewPerson, newPerson, newNumber, handleInputNumber, handleInputPerson}) => {
  return (
    <div>
    <form onSubmit={addNewPerson}>
      <div>
      Name: <input value={newPerson} onChange={handleInputPerson} />
      </div>
      <div>
      Phone no: <input value={newNumber} onChange={handleInputNumber} />
      </div>
      <div> 
        <button type='submit'>Add</button>
      </div>
    </form>
    </div>
  )
}
export default Form

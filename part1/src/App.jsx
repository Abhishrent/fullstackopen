import { useState } from 'react'

const Button = ({onClick}) => <button onClick={onClick}> Press me to get another anecdote!</button>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often', 
    'Adding manpower to a late software project makes it later!', 
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', 
    'Any fool can write code that a computer can understand. Good prorammers write code that humans can understand.', 
    'Premature optimization is the root of all evil.', 
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  //handler to generate the random anecdote
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomIndex)
    console.log('anecdote printed')    
    }

  return (
    <div>
        <Button onClick={handleClick} />
        <p>{anecdotes[selected]}</p>
    </div>
  )
}

export default App

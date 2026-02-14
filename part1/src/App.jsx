import { useState } from 'react'

const Button = ({onClick}) => <button onClick={onClick}> Press me to get another anecdote!</button>
const VoteButton = ({onClick}) => <button onClick={onClick}>vote</button>
const DisplayMostVotes = ({votes, anecdotes}) => {
  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)
  return (
  <div>
      <h1>Anecdote with most votes</h1>
      <p>"{anecdotes[maxIndex]}" has {maxVotes} votes.</p>
  </div>
  )
}

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
  const [votes, setVotes] = useState(new Array (anecdotes.length).fill(0))

  //handler to generate the random anecdote
  const handleClick = () => {
    let randomIndex
    do {
          randomIndex = Math.floor(Math.random()*anecdotes.length)
    } while (randomIndex === selected)
    setSelected(randomIndex)
    console.log('anecdote printed')    
    }

  const handleVotes = () => {
    const votesNew = [...votes]
    votesNew[selected] += 1
    setVotes(votesNew)
  }

  return (
    <div>
        <p>{anecdotes[selected]}</p>
        <p>{votes[selected]}</p>
        <Button onClick={handleClick} />
        <VoteButton onClick={handleVotes} />
        <DisplayMostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App

import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}> {text} </button>
}

const Statistics = ({good, neutral, bad}) => {
  return (
  <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good+bad+neutral
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = (good/total)*100

  return (
  <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral+1)} text='neutral' />
      <Button onClick={() => setBad(bad+1)} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
  </div>
  )
}

export default App


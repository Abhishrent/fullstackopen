import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}> {text} </button>
}

const StatisticLine = ({text, value}) => {
  return <div>{text} {value}</div>
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total===0){
    return <div>No feedback given</div>
  }
  return (
  <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='total' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
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
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
  </div>
  )
}

export default App


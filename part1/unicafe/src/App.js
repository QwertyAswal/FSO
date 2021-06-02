import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}


const Statistics = ({ good, bad, neutral }) => {

  const total = good + bad + neutral

  const average = (good - bad) / total

  const positive = good / total * 100

  if (total === 0)
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )

  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => {
    setGood(good + 1)
  }

  const neutralHandler = () => {
    setNeutral(neutral + 1)
  }

  const badHandler = () => {
    setBad(bad + 1)
  }


  return (
    <div >
      <h2>give feedback</h2>
      <Button handleClick={goodHandler} text='good' />
      <Button handleClick={neutralHandler} text='neutral' />
      <Button handleClick={badHandler} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;

import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}


const Statistics = ({ good, bad, neutral }) => {

  const total = good + bad + neutral

  const average = (good - bad) / total

  const positive = good / total * 100 + '%'

  if (total === 0)
    return (
      <>
        <p>No feedback given</p>
      </>
    )

  return (
    <>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={total} />
      <Statistic text='average' value={average} />
      <Statistic text='positive' value={positive} />
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
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;

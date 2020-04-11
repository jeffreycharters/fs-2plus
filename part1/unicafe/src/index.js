import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>Give Feedback</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props.totals
  const totalCount = good + bad + neutral
  const average = (good - bad) / totalCount
  const positive = good / totalCount * 100
  if (totalCount === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tr>
          <Statistic type='Good' count={good} />
        </tr>
        <tr>
          <Statistic type='Neutral' count={neutral} />
        </tr>
        <tr>
          <Statistic type='Bad' count={bad} />
        </tr>
        <tr>
          <Statistic type='All' count={totalCount} />
        </tr>
        <tr>
          <Statistic type='Average' count={average} />
        </tr>
        <tr>
          <td>Positive</td><td>{positive}%</td>
        </tr>
      </table>
    </div >
  )
}

const Statistic = (props) => {
  return (
    <>
      <td>{props.type}</td><td>{props.count}</td>
    </>
  )
}

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (type) => {
    if (type === 'good') {
      setGood(good + 1)
    }
    else if (type === 'neutral') {
      setNeutral(neutral + 1)
    }
    else if (type === 'bad') {
      setBad(bad + 1)
    }
    else {
      console.log('Unrecognized feedback type ', type)
    }
  }

  const totals = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <Header />
      <Button handleClick={() => handleFeedback('good')} text='Good' />
      <Button handleClick={() => handleFeedback('neutral')} text='Neutral' />
      <Button handleClick={() => handleFeedback('bad')} text='Bad' />
      <Statistics totals={totals} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
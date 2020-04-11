import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const TopAnecdote = ({ points, anecdotes }) => {
  let max = 0
  let topRanking = 0
  for (let i = 0; i < points.length; i++) {
    if (points[i] > max) {
      max = points[i]
      topRanking = i
    }
  }
  return (
    <div>
      {anecdotes[topRanking]}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const setRandomChoice = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = selected => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}<br />
      {points[selected]} votes.
      <div>
        <button onClick={() => addVote(selected)}>Vote</button>
        <button onClick={() => setRandomChoice()}>Random Anecdote</button>
      </div>

      <h1>Anecdote with the most votes</h1>
      <TopAnecdote points={points} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
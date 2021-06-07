import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const createVote = (id) => {
    const action = {
        type: 'VOTE',
        data: {
            id
        }
    }
    return action
}

const Notes = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(createVote(id))
    }

    return (
        <>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const App = () => {

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notes />
            <h2>create new</h2>
            <form>
                <div><input /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App
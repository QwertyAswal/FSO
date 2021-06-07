import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const Anecdotes = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const selected = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(createNotification(`You voted for - '${selected.content}'`))
        dispatch(createVote(id))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <p>
                        {anecdote.content} <strong>has {anecdote.votes} votes!</strong>
                    </p>
                    <p>
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </p>
                    <hr />
                </div>
            )}
        </>
    )
}

export default Anecdotes
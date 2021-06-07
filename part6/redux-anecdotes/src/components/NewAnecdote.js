import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const NewAnecdote = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const createAnecdoteHandler = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <form onSubmit={createAnecdoteHandler}>
            <p><input name="anecdote" /></p>
            <button type='submit'>create</button>
        </form>
    )
}

export default NewAnecdote
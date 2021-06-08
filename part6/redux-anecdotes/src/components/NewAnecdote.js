import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const NewAnecdote = () => {
    const dispatch = useDispatch()

    const createAnecdoteHandler = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(createNotification(`You created - '${content}'`))

    }

    return (
        <form onSubmit={createAnecdoteHandler}>
            <p><input name="anecdote" /></p>
            <button type='submit'>create</button>
        </form>
    )
}

export default NewAnecdote
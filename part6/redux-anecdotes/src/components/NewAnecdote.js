import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'


const NewAnecdote = () => {
    const dispatch = useDispatch()

    const createAnecdoteHandler = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = await anecdotesService.createAnecdote(content)

        dispatch(createNotification(`You created - '${content}'`))

        dispatch(createAnecdote(anecdote))
    }

    return (
        <form onSubmit={createAnecdoteHandler}>
            <p><input name="anecdote" /></p>
            <button type='submit'>create</button>
        </form>
    )
}

export default NewAnecdote
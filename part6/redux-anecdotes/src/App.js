import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'

const App = () => {
    const dispatch = useDispatch()
    useEffect(async () => {
        const data = await anecdotesService.getAll()
        dispatch({ type: 'INITIALIZE', data })
    }, [])
    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Anecdotes />
            <h2>create new</h2>
            <NewAnecdote />
        </div>
    )
}

export default App
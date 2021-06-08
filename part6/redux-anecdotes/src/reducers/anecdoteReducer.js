import anecdotesService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
    const compare = (a, b) => {
        if (a.votes < b.votes) {
            return 1;
        }
        if (a.votes > b.votes) {
            return -1;
        }
        return 0;
    }
    switch (action.type) {
        case 'VOTE':
            const reqAnecdote = state.find(s => s.id === action.data.id)
            const returnAnecdote = {
                ...reqAnecdote,
                votes: reqAnecdote.votes + 1
            }
            return state.map(s => s.id === action.data.id ? returnAnecdote : s).sort(compare)
        case 'NEW_ANECDOTE':
            return [...state, action.data].sort(compare)
        case 'INITIALIZE':
            return action.data
        default:
            return state.sort(compare)
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createAnecdote(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const data = await anecdotesService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data
        })
    }
}

export const createVote = (id) => {
    const action = {
        type: 'VOTE',
        data: {
            id
        }
    }
    return action
}

export default anecdoteReducer
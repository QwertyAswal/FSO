const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
        case 'NEW_NOTE':
            return [...state, action.data].sort(compare)
        default:
            return state.sort(compare)
    }
}

export const createAnecdote = (content) => {
    const anecdote = {
        type: 'NEW_NOTE',
        data: {
            content,
            id: getId(),
            votes: 0
        }
    }
    return anecdote
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

export default reducer
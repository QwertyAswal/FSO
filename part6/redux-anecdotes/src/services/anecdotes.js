import axios from "axios"

const baseUrl = '/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const data = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, data)
    return response.data
}

const updateAnecdote = async (data) => {
    const response = await axios.put(`${baseUrl}/${data.id}`, data)
    return response.data
}



const anecdotesService = {
    getAll,
    createAnecdote,
    updateAnecdote
}

export default anecdotesService
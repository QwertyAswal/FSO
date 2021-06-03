import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, changedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, changedObject)
    return request.then(response => response.data)
}

const phonebookService = {
    getAll,
    create,
    remove,
    update
}

export default phonebookService
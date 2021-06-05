import axios from 'axios'
const baseUrl = '/api/blogs'

const getAuthorizationHeader = () => {
    const token = `Bearer ${JSON.parse(window.localStorage.getItem('loggedInUser')).token}`
    const config = {
        headers: {
            Authorization: token
        }
    }
    return config
}

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl, getAuthorizationHeader())
        return response.data
    }
    catch (err) {
        return []
    }
}

const createBlog = async (blog, setMsgNotification) => {
    try {
        const response = await axios.post(baseUrl, blog, getAuthorizationHeader())
        setMsgNotification(<div>Blog Created!</div>)
        setTimeout(() => {
            setMsgNotification(null)
        }, 5000)
        return response.data
    }
    catch (err) {
        setMsgNotification(<div>Blog Created!</div>)
        setTimeout(() => {
            setMsgNotification(null)
        }, 5000)
        return null;
    }
}

const blogService = {
    getAll,
    createBlog
}

export default blogService
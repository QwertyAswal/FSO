import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    }
    catch (err) {
        console.log(err)
        return null
    }
}

const loginService = {
    login
}

export default loginService
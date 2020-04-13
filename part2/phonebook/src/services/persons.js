import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const create = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}

export default { create }
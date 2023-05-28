import axios from "axios"

const api = axios.create({
    baseURL: 'http://144.22.150.202:65129/api/user'
})

export default api
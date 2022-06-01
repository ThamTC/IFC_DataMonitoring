import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
export default axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:8000/"
})
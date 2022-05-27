import axios from 'axios'
axios.defaults.withCredentials = true
export default axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:8000/"
})
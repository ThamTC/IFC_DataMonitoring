import axios from 'axios'
axios.defaults.withCredentials = true;
const dbRequest = {
    getAllUsers: async() => {
        try {
            const resData = await axios.get("/api/db/user/index")
            return resData
        } catch (error) {
            return error
        }
    }
}
export default dbRequest
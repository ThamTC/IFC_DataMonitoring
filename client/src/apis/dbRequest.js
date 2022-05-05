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
    },
    updateUserInfo: async(user) => {
        try {
            const resData = await axios.post("/api/db/user/update", {
                user: user
            })
            return resData
        } catch (error) {
            return error
        }
    },
    getAllRoles: async() => {
        try {
            const resData = await axios.get("/api/db/role/index")
            return resData
        } catch (error) {
            return error
        }
    }
}
export default dbRequest
import axios from '../api'

export default {
    getAllUsers: async () => {
        try {
            const resData = await axios.get("/api/db/user/index")
            return resData
        } catch (error) {
            throw error
        }
    },
    updateUserInfo: async (user) => {
        try {
            const resData = await axios.post("/api/db/user/update", {
                user: user
            })
            return resData
        } catch (error) {
            throw error
        }
    },
    deleteUser: async (user) => {
        try {
            const resData = await axios.post("/api/db/user/delete", {
                user: user
            })
            return resData
        } catch (error) {
            throw error
        }
    }
}
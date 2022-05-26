import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
    getAllPermissions: async () => {
        try {
            const resData = await axios.get("/api/db/permissions/index")
            return resData
        } catch (error) {
            throw error
        }
    },
    
}
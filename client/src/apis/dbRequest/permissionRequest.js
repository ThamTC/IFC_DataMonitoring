import axios from '../api'

export default {
    getAllPermissions: async () => {
        try {
            const resData = await axios.get("/api/db/permissions/index")
            return resData
        } catch (error) {
            throw error
        }
    },
    createPermission: async (name) => {
        try {
            const resData = await axios.post("/api/db/permission/create", {
                name: name
            })
            return resData
        } catch (error) {
            throw error
        }
    }
    
}
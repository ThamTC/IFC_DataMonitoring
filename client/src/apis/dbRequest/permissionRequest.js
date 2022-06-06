import axios from '../api'

export default {
    getAllPermissions: async () => {
        try {
            const resData = await axios.get("/api/db/permission/index")
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
    },
    delete: async (id) => {
        try {
            const resData = await axios.post("api/db/permission/delete", {
                id: id
            })
            return resData
        } catch (error) {
            throw error
        }
    },
    updatePermission: async (userId, permission) => {
        try {
            const resData = await axios.post("api/db/permission/update", {
                userId: userId,
                permission: permission
            })
            return resData
        } catch (error) {
            throw error
        }
    },
    
}
import axios from '../api'

export default {
    getAllRoles: async () => {
        try {
            const resData = await axios.get("/api/db/role/index");
            return resData;
        } catch (error) {
            throw error;
        }
    },
    createRole: async (roleName, permission) => {
        try {
            const resData = await axios.post("/api/db/role/create", {
                roleName: roleName,
                permission: permission
            })
            return resData
        } catch (error) {
            throw error
        }
    },
    delete: async (id) => {
        try {
            const resData = await axios.post("api/db/role/delete", {
                id: id
            })
            return resData
        } catch (error) {
            throw error
        }
    },
    updateRole: async (id, data) => {
        try {
            const resData = await axios.post("api/db/role/update", {
                id: id,
                data: data
            })
            return resData
        } catch (error) {
            throw error
        }
    },
    requestRole: async (email, roleName, content) => {
        try {
            const resData = await axios.post("api/db/role/request_role", {
                email: email,
                roleName: roleName,
                content: content
            })
            return resData
        } catch (error) {
            throw error
        }
    }
}

import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
    getAllRoles: async () => {
        try {
            const resData = await axios.get("/api/db/role/index");
            return resData;
        } catch (error) {
            return error;
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
            return error
        }
    }
}

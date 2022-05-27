import axios from "../../../apis/api";
import jwtDecode from "jwt-decode";

export default {
    signin: async ({ commit, state }, user) => {
        try {
            const res = await axios.post("api/auth/login", user);
            const jwtDecoded = jwtDecode(res.data.accessToken)
            // save to vuex
            commit("setUser", jwtDecoded);
            commit("setIsLoggin", true);
            // store.methods.setLoadTable(loadTableName)
            localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
            return jwtDecoded;
        } catch (error) {
            throw error;
        }
    },
    signout: async ({ commit, state }) => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const token = JSON.parse(accessToken)
            const res = await axios.post("api/auth/logout", { accessToken: token });
            localStorage.clear()
            return res.data;
        } catch (error) {
            return error.response;
        }
    },
    updateManagerUsers: ({ commit, state }, user) => {
        const managerUsers = state.managerUsers.map((ele) =>
            ele.email !== user.email ? ele : user
        );
        commit("setManagerUsers", managerUsers);
    },
    deleteUserFromManager: ({ commit, state }, user) => {
        const managerUsers = state.managerUsers.filter(
            (ele) => ele.email !== user.email
        );
        commit("setManagerUsers", managerUsers);
        commit("setManagerUserInfo", {});
    },
    deleteRolesManager: ({commit, state}, role) => {
        const rolesFilter = state.roles.filter(ele => ele.name != role)
        commit("setRoles", rolesFilter)
    },
    deleteRoleManager: ({commit, state}, roleName) => {
        const roleFiltered = state.roles.filter(ele => ele.name != roleName)
        commit("setRoles", roleFiltered)
    },
    updateRoles({commit, state}, role) {
        const roles = state.roles
        roles.forEach((ele, idx) => {
            if (ele.id == role.id) {
                roles[idx] = role
            }
        });
        commit("setRoles", roles)
    },
    updatePermissionDetails({commit, state}, permission) {
        const roles = state.roles
        const permissionDetails = state.permissionDetails
        roles.forEach((ele, idx) => {
            if (ele.name == permission.name) {
                permissionDetails[idx] = permission.data
            }
        })
        commit("setPermissionDetails", permissionDetails)
    },
    insertPermissionDetails({commit, state}, permission) {
        const permissionDetails = state.permissionDetails
        permissionDetails.push(permission)
        commit("setPermissionDetails", permissionDetails)
    }
};

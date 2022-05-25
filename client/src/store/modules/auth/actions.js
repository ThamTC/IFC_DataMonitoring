import axios from "axios";
import jwtDecode from "jwt-decode";
axios.defaults.withCredentials = true;

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
};

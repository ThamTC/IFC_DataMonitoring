import axios from "axios";
import store from "../stores/store";
import jwtDecode from "jwt-decode";
axios.defaults.withCredentials = true;
const apiRequest = {
  login: async (user) => {
    try {
      const res = await axios.post("api/auth/login", user);
      const jwtDecoded = jwtDecode(res.data.accessToken)
      // save to vuex
      var loadTableName = ""
      if (jwtDecoded.permissions[0]) {
        loadTableName = jwtDecoded.permissions[0].split('-')[1]
      }
      store.commit("setUser", jwtDecoded);
      store.commit("setIsLoggin", true);
      store.commit("setLoadTable", loadTableName)
      // localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
      return res;
    } catch (error) {
      throw error;
    }
  },
  register: async (user) => {
    try {
      const res = await axios.post("api/auth/register", user);
      // save to vuex
      return "success";
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      const token = JSON.parse(accessToken)
      const res = await axios.post("api/auth/logout", {accessToken: token});
      store.commit("setUser", {});
      store.commit("setIsLoggin", false);
      localStorage.clear()
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
  refreshToken: async () => {
    // store.state.user?.accessToken
    try {
      const res = await axios.post("api/auth/refresh", {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
  resetPassword: async (email) => {
    try {
      const res = axios.post("/api/auth/reset", {
        email: email,
      });
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
  isLogged: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      const user = jwtDecode(accessToken)
      const res = await axios.post(
        "/api/auth/isLogged",
        {
          user: user,
        },
        {
          withCredentials: true,
        }
      );
      const loadTableName = res.data.permissions[0].split('-')[1]
      store.commit("setUser", res.data);
      store.commit("setIsLoggin", true);
      store.commit("setLoadTable", loadTableName)
      return res; // return true or false
    } catch (error) {
      return error.response;
    }
  },
};

export default apiRequest;

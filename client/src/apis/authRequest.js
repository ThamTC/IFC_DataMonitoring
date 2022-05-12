import axios from "axios";
import store from "../stores/store";
axios.defaults.withCredentials = true;
const apiRequest = {
  login: async (user) => {
    try {
      const res = await axios.post("api/auth/login", user);
      // save to vuex
      var loadTableName = ""
      if (res.data.permissions[0]) {
        loadTableName = res.data.permissions[0].split('-')[1]
      }
      store.commit("setUser", res.data);
      store.commit("setIsLoggin", true);
      store.commit("setLoadTable", loadTableName)
      localStorage.setItem("user", JSON.stringify(res.data));
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
      const user = localStorage.getItem("user")
      const token = JSON.parse(user)
      const res = await axios.post("api/auth/logout", {accessToken: token.accessToken});
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
      const user = localStorage.getItem("user") ?? {};
      const res = await axios.post(
        "/api/auth/isLogged",
        {
          user: JSON.parse(user),
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

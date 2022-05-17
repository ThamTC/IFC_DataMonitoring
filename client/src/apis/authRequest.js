import axios from "axios";
axios.defaults.withCredentials = true;
const apiRequest = {
  
  register: async (user) => {
    try {
      const res = await axios.post("api/auth/register", user);
      // save to vuex
      return "success";
    } catch (error) {
      throw error;
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
      const res = await axios.post(
        "/api/auth/isLogged",
        {
          // user: user,
        },
        {
          withCredentials: true,
        }
      );
      return res; // return true or false
    } catch (error) {
      return error.response;
    }
  }
}
export default apiRequest;

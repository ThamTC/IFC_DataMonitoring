import axios from "./api";
const apiRequest = {
  
  register: async (user) => {
    try {
      const resData = await axios.post("api/auth/register", user);
      // save to vuex
      return "success";
    } catch (error) {
      throw error;
    }
  },
  refreshToken: async () => {
    // store.state.user?.accessToken
    try {
      const resData = await axios.post("api/auth/refresh", {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(resData.data));
      return resData.data;
    } catch (error) {
      return error.response;
    }
  },
  resetPassword: async (email) => {
    try {
      const resData = axios.post("/api/auth/reset", {
        email: email,
      });
      return resData.data;
    } catch (error) {
      return error.response;
    }
  },
  isLogged: async () => {
    try {
      const resData = await axios.post(
        "/api/auth/isLogged",
        {
          // user: user,
        },
        {
          withCredentials: true,
        }
      );
      return resData; // return true or false
    } catch (error) {
      return error.response;
    }
  },
  changePassword: async (email, oldPassword, newPassword) => {
    try {
      const resData = await axios.post("/api/auth/changePassword", {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      })
      return resData
    } catch (error) {
      throw error
    }
  }
}
export default apiRequest;

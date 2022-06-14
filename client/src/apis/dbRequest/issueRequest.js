import axios from "../api";
export default {
  getIssueIndex: async (id) => {
    try {
      const resData = await axios.get("/api/db/issue/"+id);
      return resData;
    } catch (error) {
      throw error;
    }
  },
  createIssue: async (data) => {
    try {
      const resData = await axios.post("/api/db/issue/create", {
        data: data,
      });
      return resData;
    } catch (error) {
      throw error;
    }
  },
  updateIssue: async (id, data) => {
    try {
      const resData = await axios.post("api/db/issue/update", {
        id: id,
        data: data,
      });
    } catch (error) {
      throw error;
    }
  },
};
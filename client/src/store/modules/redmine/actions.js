import axios from "../../../apis/api";
export default {
  async getAllIssue(commit, data) {
    try {
      const resData = await axios.get("api/db/issues", {
        params: {
            assignee: data.where.assignee,
            startDate: data.where.startDate,
            endDate: data.where.endDate,
            offset: data.offset,
            limit: data.limit
        },
      });
      return resData;
    } catch (error) {
      throw error.response;
    }
  },
  async getCounterIssue(commit, data) {
      try {
          const resData = await axios.get("api/db/issues/counter", {
            params: data,
          })
          return resData
      } catch (error) {
          throw error.response
      }
  }
};

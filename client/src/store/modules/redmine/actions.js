import axios from "../../../apis/api";
export default {
  async getAllIssue(commit, data) {
    try {
      const resData = await axios.get("api/db/issues", {
        params: {
          status: data.where.status,
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
  },
  async indexDescription(commit, issueId) {
    try {
      const resData = await axios.get("api/db/issues/description", {
        params: {issueId: issueId}
      })
      return resData
    } catch (error) {
      throw error.response
    }
  },
  async createDescription(commit, payload) {
    try {
      const resData = await axios.post("api/db/issues/description", {
        payload: payload
      })
      return resData
    } catch (error) {
      throw error.response
    }
  }
};

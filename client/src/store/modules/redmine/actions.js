import axios from "../../../apis/api";
export default {
    async getAllIssue(commit, data) {
        try {
            let resData
            if (data.role === "manager") {
                resData = await axios.get("api/db/issue/index");
            } else {
                resData = await axios.get("api/db/issue/by_user/"+data.authName);
            }
            return resData;
        } catch (error) {
            throw error.response;
        }
    },
};

import axios from '../../../apis/api'
export default {
    async getAllIssue(commit, data){
        try {
            const resData = await axios.get("api/db/issue/index")
            return resData
        } catch (error) {
            throw error.response
        }
    }
}
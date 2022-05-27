import axios from '../../../apis/api'

export default {
    getStatisticStore: async ({commit, state}, key) => {
        try {
            const resData = await axios.post("/api/redis/index", {key: key})
            commit("setDataStatistic", {key: key, data: resData.data})
            return resData.data
        } catch (error) {
            return error.response
        }
    },
    selectTask: async ({commit, state}, {e: e, checkerName: checkerName, key: key}) => {
        try {
            const resData = await axios.post("api/redis/update", {
                id: e.target.value,
                isAction: e.target.checked,
                username: e.target.checked ? checkerName : "",
                key: key
            })
            commit("setDataStatistic", {key: key, data: resData.data})
            return resData.data
        } catch (error) {
            return error.response
        }
    },
}
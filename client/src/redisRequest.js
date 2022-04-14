import axios from 'axios'

const redisRequest = {
    getIndexStore: async(key) => {
        try {
            const resData = await axios.post("/api/redis/index", {key: key})
            return resData
        } catch (error) {
            return error.response
        }
    },
    selectTask: async(e, checkerName) => {
        try {
            const resData = await axios.post("api/redis/update", {
                id: e.target.value,
                isAction: e.target.checked,
                username: e.target.checked ? checkerName : ""
            })
            return resData.data
        } catch (error) {
            return error.response
        }
    },
    doneTask: async(id, checkerName, doneName) => {
        try {
            const resData = await axios.post("api/redis/delete", {
                id: id,
                userCheck: checkerName,
                userDone: doneName
            })
            return resData.data
        } catch (error) {
            return error.response
        }
    },
    doneAllTask: async(doneName) => {
        try {
            const resData = await axios.post("api/redis/deleteAll", {
                userCheck: doneName,
                userDone: doneName
            })
            return resData.data
        } catch (error) {
            return error.response
        }
    }
}

export default redisRequest
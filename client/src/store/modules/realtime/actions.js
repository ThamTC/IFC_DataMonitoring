import axios from 'axios'
import convert from '../../../untils/convert'
axios.defaults.withCredentials = true
export default {
    getRealtimeStore: async ({ commit, state }, key) => {
        try {
            const resData = await axios.post("/api/redis/index", { key: key })
            return resData.data
        } catch (error) {
            return error.response
        }
    },
    counterColorStore: ({ commit, state }, key) => {
        var data
        if (key == "realtime") {
            data = state.dataRealtime;
        } else {
            data = state.solarRealtime;
        }
        var showCountSorted = {};
        data.forEach((ele) => {
            const colorName = convert.idToColor(ele.priority);
            showCountSorted[colorName] = (showCountSorted[colorName] || 0) + 1;
        });
        commit("setCountColors", {key: key, data: Object.entries(showCountSorted)});
    },
    realtimeStore: ({ commit, state }, payload) => {
        var resParser
        if (payload.key == "realtime") {
            resParser = state.dataRealtime;
        } else {
            resParser = state.solarRealtime;
        }
        resParser.unshift(payload.data)
        commit("setDataRealtime", {key: payload.key, data: resParser});
    },
    currentDataStore: ({commit, state}, payload) => {
        const message = (payload.data.type ?? "") + " " + (payload.data.system ?? "") + " " + (payload.data.parameter ?? "")
        const colorName = convert.idToColor(payload.data.priority);
        commit("setCurrentData", {key: payload.key, data: {msg: message, color: colorName}})
      },
}
import axios from '../../../apis/api'
import convert from '../../../untils/convert'
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
        } if (key == "bmb_realtime") {
            data = state.bmbRealtime
        }
        else {
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
        } else if (payload.key == "bmb_realtime") {
            resParser = state.bmbRealtime;
        }
        else {
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
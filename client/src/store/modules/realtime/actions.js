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
        switch (key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                data = state.dataRealtime;
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                data = state.bmbRealtime
                break;
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                data = state.solarRealtime;
                break;
            default:
                break;
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
        switch (payload.key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                resParser = state.dataRealtime;
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                resParser = state.bmbRealtime;
                break
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                resParser = state.solarRealtime;
                break
            default:
                break;
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
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
    counterColorStore: ({ commit, state }) => {
        const data = state.dataRealtime;
        var showCountSorted = {};
        data.forEach((ele) => {
            const colorName = convert.idToColor(ele.priority);
            showCountSorted[colorName] = (showCountSorted[colorName] || 0) + 1;
        });
        commit("setCountColors", Object.entries(showCountSorted));
    },
    realtimeStore: ({ commit, state }, data) => {
        var resParser = state.dataRealtime;
        resParser.unshift(data)
        // if (resParser.length > 0) {
        //   // chen data theo thu tu
        //   for (let idx = 0; idx < resParser.length; idx++) {
        //     if (
        //       resParser[idx].priority == 0 ||
        //       (data.priority > 0 && data.priority <= resParser[idx].priority)
        //     ) {
        //       resParser.splice(idx, 0, data);
        //       break;
        //     } else if (idx == resParser.length - 1) {
        //       resParser.push(data);
        //       break;
        //     }
        //   }
        // } else {
        //   resParser.push(data);
        // }
        commit("setDataRealtime", resParser);
    },
    currentDataStore: ({commit, state}, data) => {
        const message = (data.type ?? "") + " " + (data.system ?? "") + " " + (data.parameter ?? "")
        const colorName = convert.idToColor(data.priority);
        commit("setCurrentData", {msg: message, color: colorName})
      },
}
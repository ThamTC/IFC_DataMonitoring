const key_data = "realtime"
const key_solar = "solar_realtime"
const key_bmb = "bmb_realtime"
export default {
    setDataRealtime(state, payload) {
        switch (payload.key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                state.dataRealtime = payload.data;
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                state.bmbRealtime = payload.data
                break
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                state.solarRealtime = payload.data;
                break
            default:
                break;
        }
    },
    insertDataRealtime(state, key, item) {
        switch (key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                state.dataRealtime.unshift(item);
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                state.bmbRealtime.unshift(item)
                break
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                state.solarRealtime.unshift(item);
                break
            default:
                break;
        }
    },
    setCountColors(state, payload) {
        switch (payload.key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                state.countColors = payload.data
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                state.countColorBmbs = payload.data
                break
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                state.countColorSolars = payload.data
                break
            default:
                break;
        }
    },
    setCurrentData(state, payload) {
        switch (payload.key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                state.currentData = payload.data
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                state.currentBmb = payload.data
                break
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                state.currentSolar = payload.data
                break
            default:
                break;
        }
    },
    setDataRealtimeFilter(state, payload) {
        switch (payload.key) {
            case process.env.VUE_APP_CHANNEL_BDH_REALTIME:
                state.dataRealtimeFilter = payload.data
                break;
            case process.env.VUE_APP_CHANNEL_BMB_REALTIME:
                state.bmbRealtimeFilter = payload.data
                break
            case process.env.VUE_APP_CHANNEL_SOLAR_REALTIME:
                state.solarRealtimeFilter = payload.data
                break
            default:
                break;
        }
    }
}
const key_data = "realtime"
const key_solar = "solar_realtime"
const key_bmb = "bmb_realtime"
export default {
    setDataRealtime(state, payload) {
        if (payload.key == key_data) {
            state.dataRealtime = payload.data;
        } else if (payload.key == key_solar) {
            state.solarRealtime = payload.data;
        } else {
            state.bmbRealtime = payload.data
        }
    },
    insertDataRealtime(state, key, item) {
        if (key == key_data) {
            state.dataRealtime.unshift(item);
        } else if (key == key_solar) {
            state.solarRealtime.unshift(item);            
        } else {
            state.bmbRealtime.unshift(item)
        }
    },
    setCountColors(state, payload) {
        if (payload.key == key_data) {
            state.countColors = payload.data
        } else if (payload.key == key_solar) {
            state.countColorSolars = payload.data
        } else {
            state.countColorBmbs = payload.data
        }
    },
    setCurrentData(state, payload) {
        if (payload.key == key_data) {
            state.currentData = payload.data
        } else if (payload.key == key_solar) {
            state.currentSolar = payload.data   
        } else {
            state.currentBmb = payload.data
        }
    },
    setDataRealtimeFilter(state, payload) {
        if (payload.key == key_data) {
            state.dataRealtimeFilter = payload.data
        } else if (payload.key == key_solar) {
            state.solarRealtimeFilter = payload.data
        } else {
            state.bmbRealtimeFilter = payload.data
        }
    }
}
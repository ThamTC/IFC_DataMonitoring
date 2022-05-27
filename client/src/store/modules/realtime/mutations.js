const key_data = "realtime"
const key_solar = "solar_realtime"

export default {
    setDataRealtime(state, payload) {
        if (payload.key == key_data) {
            state.dataRealtime = payload.data;
        } else if (payload.key == key_solar) {
            state.solarRealtime = payload.data;
        } else {
            // do something
        }
    },
    insertDataRealtime(state, key, item) {
        if (key == key_data) {
            state.dataRealtime.unshift(item);
        } else if (key == key_solar) {
            state.solarRealtime.unshift(item);            
        } else {
            // do something
        }
    },
    setCountColors(state, payload) {
        if (payload.key == key_data) {
            state.countColors = payload.data
        } else if (payload.key == key_solar) {
            state.countColorSolars = payload.data
        } else {
            // do something
        }
    },
    setCurrentData(state, payload) {
        if (payload.key == key_data) {
            state.currentData = payload.data
        } else if (payload.key == key_solar) {
            state.currentSolar = payload.data   
        } else {
            // do something
        }
    },
    setDataRealtimeFilter(state, payload) {
        if (payload.key == key_data) {
            state.dataRealtimeFilter = payload.data
        } else if (payload.key == key_solar) {
            state.solarRealtimeFilter = payload.data
        } else {
            
        }
    }
}
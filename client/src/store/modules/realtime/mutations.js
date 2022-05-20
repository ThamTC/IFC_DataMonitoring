export default {
    setDataRealtime(state, data) {
        state.dataRealtime = data;
    },
    insertDataRealtime(state, item) {
        state.dataRealtime.unshift(item);
    },
    setCountColors(state, data) {
        state.countColors = data
    },
    setCurrentData(state, data) {
        state.currentData = data
    },
    setDataRealtimeFilter(state, data) {
        state.dataRealtimeFilter = data
    }
}
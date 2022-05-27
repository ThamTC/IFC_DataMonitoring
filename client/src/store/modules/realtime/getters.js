function isEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}
export default {
    getDataRealtime(state) {
        return state.dataRealtime;
    },
    getCurrentData(state) {
        return state.currentData
    },
    getDataRealtimeFilter(state) {
        return state.dataRealtimeFilter
    },
    getCountColors(state) {
        return state.countColors
    },
    // for solar
    getSolarRealtime(state) {
        return state.solarRealtime;
    },
    getCurrentSolar(state) {
        const current = state.currentSolar
        if (isEmpty(current)) {
            return {color: "", message: ""}
        }
        return state.currentSolar
    },
    getSolarRealtimeFilter(state) {
        return state.solarRealtimeFilter
    },
    getCountColorSolars(state) {
        return state.countColorSolars
    },
}
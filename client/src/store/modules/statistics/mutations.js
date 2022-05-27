export default {
    setDataStatistic(state, payload) {
        if (payload.key == "statistic") {
            state.dataStatistic = payload.data;
        } else {
            state.solarStatistic = payload.data;
        }
    },
    insertDataStatistic(state, item) {
        state.dataStatistic.unshift(item);
    },
}
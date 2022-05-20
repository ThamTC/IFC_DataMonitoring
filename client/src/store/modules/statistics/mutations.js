export default {
    setDataStatistic(state, data) {
        state.dataStatistic = data;
    },
    insertDataStatistic(state, item) {
        state.dataStatistic.unshift(item);
    },
}
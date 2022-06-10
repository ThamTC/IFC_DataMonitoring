export default {
    setDataStatistic(state, payload) {
        switch (payload.key) {
            case process.env.VUE_APP_CHANNEL_BDH_STATISTIC:
                state.dataStatistic = payload.data
                break;
            case process.env.VUE_APP_CHANNEL_SOLAR_STATISTIC:
                state.solarStatistic = payload.data
                break
            default:
                break;
        }
    },
    insertDataStatistic(state, item) {
        state.dataStatistic.unshift(item);
    },
}
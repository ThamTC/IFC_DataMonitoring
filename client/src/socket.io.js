// import store from './store'
import sound from "./services/howl";
export default {
    // for bmb
    bmb_realtime: function (data) {
        sound.play();
        this.$store.dispatch("currentDataStore", {
            key: "bmb_realtime",
            data: data,
        });
        this.$store.dispatch("realtimeStore", {
            key: "bmb_realtime",
            data: data,
        });
        this.$store.dispatch("counterColorStore", "bmb_realtime");
    },
    updateRealtimeBmb: function (data) {
        if (data.error == null) {
            if (data.data.length == 0) {
                this.$store.commit("setCurrentData", {
                    key: "bmb_realtime",
                    data: {},
                });
            }
            this.$store.commit("setDataRealtime", {
                key: "bmb_realtime",
                data: data.data,
            });
            this.$store.dispatch("counterColorStore", "bmb_realtime");
        }
    },
    // for general
    realtime: function (data) {
        sound.play();
        this.$store.dispatch("currentDataStore", {
            key: "realtime",
            data: data,
        });
        this.$store.dispatch("realtimeStore", {
            key: "realtime",
            data: data,
        });
        this.$store.dispatch("counterColorStore", "realtime");
    },
    statistic: function (data) {
        this.$store.commit("setDataStatistic", {
            key: "statistic",
            data: data,
        });
    },
    updateRealtime: function (data) {
        if (data.error == null) {
            if (data.data.length == 0) {
                this.$store.commit("setCurrentData", {
                    key: "realtime",
                    data: {},
                });
            }
            this.$store.commit("setDataRealtime", {
                key: "realtime",
                data: data.data,
            });
            this.$store.dispatch("counterColorStore", "realtime");
        }
    },
    updateStatistic: function (data) {
        if (data.error == null) {
            this.$store.commit("setDataStatistic", {
                key: "statistic",
                data: data.data,
            });
        }
    },
    // for solor
    solar_realtime: function(data) {
        sound.play();
        this.$store.dispatch("currentDataStore", {
            key: "solar_realtime",
            data: data,
        });
        this.$store.dispatch("realtimeStore", {
            key: "solar_realtime",
            data: data,
        });
        this.$store.dispatch("counterColorStore", "solar_realtime");
    },
    solar_statistic: function (data) {
        this.$store.commit("setDataStatistic", {
            key: "solar_statistic",
            data: data,
        });
    },
    updateRealtimeSolar: function (data) {
        if (data.error == null) {
            if (data.data.length == 0) {
                this.$store.commit("setCurrentData", {
                    key: "solar_realtime",
                    data: {},
                });
            }
            this.$store.commit("setDataRealtime", {
                key: "solar_realtime",
                data: data.data,
            });
            this.$store.dispatch("counterColorStore", "solar_realtime");
        }
    },
    updateStatisticSolar: function (data) {
        if (data.error == null) {
            this.$store.commit("setDataStatistic", {
                key: "solar_statistic",
                data: data.data,
            });
        }
    },
};

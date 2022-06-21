
import sound from "./services/howl";
import checkRole from "./untils/checkRole";
import myToast from "./untils/myToast";
import ConstString from "./untils/constString";
const socketIo = {
    // for bmb
    bmb_realtime: function (data) {
        const user = this.$store.getters.getUser
        const isCan = checkRole(user, ["bmb_realtime"], ConstString.READ)
        if (isCan) {
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
        } 
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
        const user = this.$store.getters.getUser
        const isCan = checkRole(user, ["realtime"], ConstString.READ)
        if (isCan) {
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
        }
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
        const user = this.$store.getters.getUser
        const isCan = checkRole(user, ["solar_realtime"], ConstString.READ)
        if (isCan) {
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
        }
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
    usersLogin: function (data) {
        const owner = this.getUser
        const userLogin = data.currentLogin ?? ""
        if (userLogin != owner.username) {
            myToast({
                title: "Signin",
                message: userLogin + " đã truy cập web giám sát",
                type: "signin",
                duration: 5000
            })
        }
        this.$store.commit("setUsersLogin", data.usersLogin)
    },
    userLogout: function (data) {
        const currentLogout = data.currentLogout ?? ""
        const usersLogin = data.usersLogin
        myToast({
            title: "Signout",
            message: currentLogout + " đã rời khỏi web giám sát",
            type: "signout",
            duration: 5000
        })
        this.$store.commit("setUsersLogin", usersLogin)
    },
    createIssue: function (data) {
        const user = this.$store.getters.getUser
        if (user.role == 'manager' || user.username == data.assignee) {
            this.$store.commit("insertIssue", data)
        }
    }
};
export default socketIo

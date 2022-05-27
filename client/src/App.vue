<template>
<div>
    <router-view name="navbar"></router-view>
    <router-view></router-view>
    <!-- <Footer></Footer> -->
    <div id="myToast"></div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from "vuex";
import sound from './services/howl'
import checkPermission from './untils/checkPermission'
import myToast from './untils/myToast'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import checkRole from './untils/checkRole'

export default {
    name: "App",
    components: {
        NavBar,
        Footer
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        
    },
    methods: {
        ...mapMutations(["setUsersLogin", "setDataStatistic", "setCurrentData", "setDataRealtime"]),
        ...mapActions(["realtimeStore", "currentDataStore", "counterColorStore"]),
    },
    sockets: {
        realtime: function (data) {
            const isCanView = checkRole(this.getUser, ["admin", "manager"])
            if (isCanView) {
                sound.play()
                this.currentDataStore({key: "realtime", data: data})
                this.realtimeStore({key: "realtime", data: data})
                this.counterColorStore("realtime")
            }
        },
        statistic: function (data) {
            const isCanView = checkRole(this.getUser, ["admin", "manager"])
            if (isCanView) {
                this.setDataStatistic({key: "statistic", data: data})
            }
        },
        solar_realtime: function (data) {
            const isCanView = checkRole(this.getUser, ["solar", "manager"])
            if (isCanView) {
                sound.play()
                this.currentDataStore({key: "solar_realtime", data: data})
                this.realtimeStore({key: "solar_realtime", data: data})
                this.counterColorStore("solar_realtime")
            }
        },
        solar_statistic: function (data) {
            const isCanView = checkRole(this.getUser, ["solar", "manager"])
            if (isCanView) {
                this.setDataStatistic({key: "solar_statistic", data: data})
            }
        },
        updateRealtime: function (data) {
            if (data.error == null) {
                if (data.data.length == 0) {
                    this.setCurrentData({key: "realtime", data: {}})
                }
                this.setDataRealtime({key: "realtime", data: data.data});
                this.counterColorStore("realtime")
            }
        },
        updateStatistic: function (data) {
            if (data.error == null) {
                this.setDataStatistic({key: "statistic", data: data.data});
            }
        },
        updateRealtimeSolar: function (data) {
            if (data.error == null) {
                if (data.data.length == 0) {
                    this.setCurrentData({key: "solar_realtime", data: {}})
                }
                this.setDataRealtime({key: "solar_realtime", data: data.data});
                this.counterColorStore("solar_realtime")
            }
        },
        updateStatisticSolar: function (data) {
            if (data.error == null) {
                this.setDataStatistic({key: "solar_statistic", data: data.data});
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
            this.setUsersLogin(data.usersLogin)
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
            this.setUsersLogin(usersLogin)
        },
        refreshPage: function () {
            console.log("asdfsdgss")
            this.$route.go()
        }
    }
};
</script>

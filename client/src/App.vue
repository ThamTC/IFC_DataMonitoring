<template>
<router-view></router-view>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import sound from './services/howl'
import checkPermission from './untils/checkPermission'
import myToast from './untils/myToast'

export default {
    name: "App",
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        ...mapMutations(["setUsersLogin", "setDataStatistic", "setCurrentData", "setDataRealtime"]),
        ...mapActions(["realtimeStore", "currentDataStore", "counterColorStore"]),
    },
    sockets: {
        realtime: function (data) {
            const isCanView = checkPermission(this.getUser, ["view-realtime"])
            if (isCanView) {
                sound.play()
                this.currentDataStore(data)
                this.realtimeStore(data)
                this.counterColorStore()
            }
        },
        statistic: function (data) {
            const isCanView = checkPermission(this.getUser, ["view-statistic"])
            if (isCanView) {
                this.setDataStatistic(data)
            }
        },
        updateRealtime: function (data) {
            if (data.error == null) {
                if (data.data.length == 0) {
                    this.setCurrentData({})
                }
                this.setDataRealtime(data.data);
                this.counterColorStore()
            }
        },
        updateStatistic: function (data) {
            if (data.error == null) {
                this.setDataStatistic(data.data);
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

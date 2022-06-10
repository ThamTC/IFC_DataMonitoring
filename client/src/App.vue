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
import myToast from './untils/myToast'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import permissionRequest from './apis/dbRequest/permissionRequest';
import socketIo from './socket.io';

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
        permissionRequest.getAllPermissions()
            .then(res => {
                this.setPermissionDetails(res.data.map(ele => {
                    return {
                        id: ele.id,
                        name: ele.name
                    }
                }))
            })
            .catch(error => {
                console.log(error)
            })
        
    },
    methods: {
        ...mapMutations(["setUsersLogin", "setDataStatistic", "setCurrentData", "setDataRealtime", "setPermissionDetails"]),
        ...mapActions(["realtimeStore", "currentDataStore", "counterColorStore"])
    },
    sockets: {
        realtime: socketIo.realtime,
        statistic: socketIo.statistic,
        updateRealtime: socketIo.updateRealtime,
        updateStatistic: socketIo.updateStatistic,
        solar_realtime: socketIo.solar_realtime,
        solar_statistic: socketIo.solar_statistic,
        updateRealtimeSolar: socketIo.updateRealtimeSolar,
        updateStatisticSolar: socketIo.updateStatisticSolar,
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
        }
    }
};
</script>

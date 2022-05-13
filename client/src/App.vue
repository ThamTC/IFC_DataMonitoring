<template>
<router-view></router-view>
</template>

<script>
import store from './stores/store'
import sound from './services/howl'
import checkPermission from './untils/checkPermission'
import storeController from './controllers/storeController'
import myToast from './untils/myToast'

export default {
    name: "App",
    sockets: {
        realtime: function (data) {
            const isCanView = checkPermission(store.getters.getUser, ["view-realtime"])
            if (isCanView) {
                sound.play()
                storeController.currentDataStore(data)
                storeController.realtimeStore(data)
                storeController.counterColorStore()
                // store.commit("setDataRealtime", data)
                // store.commit("setCountColors", data)
            }
        },
        statistic: function (data) {
            const isCanView = checkPermission(store.getters.getUser, ["view-statistic"])
            if (isCanView) {
                store.commit("setDataStatistic", data)
            }
        },
        updateRealtime: function (data) {
            if (data.error == null) {
                if (data.data.length == 0) {
                    store.commit("setCurrentData", {})
                }
                storeController.redisRealtimeStore(data.data)
                storeController.counterColorStore()
            }
        },
        updateStatistic: function (data) {
            if (data.error == null) {
                store.commit("setDataStatistic", data.data);
            }
        },
        usersLogin: function (data) {
            console.log("usersLogin: ", data)
            const owner = store.getters.getUser
            const userLogin = data.currentLogin
            if (userLogin != owner.username) {
                myToast({
                    title: "Signin",
                    message: userLogin + " đã truy cập web giám sát",
                    type: "signin",
                    duration: 5000
                })
            }
            store.commit("setUsersLogin", data.usersLogin)
        },
        userLogout: function (data) {
            const currentLogout = data.currentLogout
            const usersLogin = data.usersLogin
            console.log("usersLogout: ", data)
            myToast({
                title: "Signout",
                message: currentLogout + " đã rời khỏi web giám sát",
                type: "signout",
                duration: 5000
            })
            store.commit("setUsersLogin", usersLogin)
        }
    }
};
</script>

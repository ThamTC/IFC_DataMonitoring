<template>
<router-view></router-view>
</template>

<script>
import store from './stores/store'
import sound from './services/howl'
import checkPermission from './untils/checkPermission'
export default {
    name: "App",
    sockets: {
        realtime: function (data) {
            const isCanView = checkPermission(store.getters.getUser, ["view-realtime"])
            if (isCanView) {
                sound.play()
                store.commit("insertDataRealtime", data)
            }
        },
        statistic: function (data) {
            const isCanView = checkPermission(store.getters.getUser, ["view-statistic"])
            if (isCanView) {
                store.commit("setDataStatistic", data)
            }
        },
        test_realtime: function (data) {
            const isCanView = checkPermission(store.getters.getUser, ["view-test"])
            if (isCanView) {
                sound.play()
                store.commit("setDataTest", data)
                store.commit("setCountColors", data)
            }
        }
    }
};
</script>

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
                store.commit("setDataRealtime", data)
                store.commit("setCountColors", data)
            }
        },
        statistic: function (data) {
            const isCanView = checkPermission(store.getters.getUser, ["view-statistic"])
            if (isCanView) {
                store.commit("setDataStatistic", data)
            }
        }
    }
};
</script>

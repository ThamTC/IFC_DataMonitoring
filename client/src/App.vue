<template>
<router-view></router-view>
</template>

<script>
import store from './stores/store'
import sound from './services/howl'
export default {
    name: "App",
    sockets: {
        realtime: function (data) {
            sound.play()
            store.commit("insertDataRealtime", data)
        },
        statistic: function (data) {
            store.commit("insertDataStatistic", data)
        }
    }
};
</script>

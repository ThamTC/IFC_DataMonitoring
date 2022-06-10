<template>
  <RealTimeTable/>
</template>

<script>
import { mapActions } from 'vuex'
import RealTimeTable from './RealTimeTable.vue'
import sound from '../../services/howl'
import socketIo from '../../socket.io'
export default {
  name: "BMBRealTimeTable",
  components: {RealTimeTable},
  created() {
    this.sockets.subscribe("bmb_realtime", socketIo.bmb_realtime)
    this.sockets.subscribe("updateRealtimeBmb", socketIo.updateRealtimeBmb)
  },
  methods: {
    ...mapActions(["realtimeStore", "currentDataStore", "counterColorStore"]),
  },
}
</script>

<style>

</style>>
<template>
<RealTimeTable :realtimeData="realtimeData"/>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import convert from '../../untils/convert'
import RealTimeTable from './RealTimeTable.vue'
export default {
    name: "BDHRealTimeTable",
    data() {
        return {
            realtimeData: {
                isError: false,
                error: null,
                isLoading: true,
                routeName: "",
                countColors: [],
                dataItems: [],
                currentData: {}
            }
        }
    },
    components: {
        RealTimeTable
    },
    computed: {
        ...mapGetters([
            "getDataRealtime", "getCountColors", "getCurrentData"
        ]),
        countColors() {
            return this.realtimeData.countColors = this.getCountColors
        },
        dataItems() {
            return this.realtimeData.dataItems = this.getDataRealtime
        },
        currentData() {
            return this.realtimeData.currentData = this.getCurrentData
        }
    },
    watch: {
        countColors() {
        },
        dataItems() {
        },
        currentData() {
        }
    },
    async created() {
        document.title = "BDH Realtime"
        this.realtimeData.routeName = this.$route.name
        this.getRealtimeStore(this.realtimeData.routeName)
        .then((data) => {
            if (data == "") {
                data = []
            }
            this.setDataRealtime({key: "realtime", data: data})
            this.counterColorStore(this.realtimeData.routeName)
            this.realtimeData.currentData = this.getCurrentData
            this.realtimeData.isLoading = false
            })
        .catch((err) => {
            this.realtimeData.isLoading = false
            this.realtimeData.isError = true
            this.realtimeData.error = err.message
        })
    },
    methods: {
        ...mapActions(["getRealtimeStore", "counterColorStore"]),
        ...mapMutations(["setDataRealtime"]),
    }

}
</script>

<style>

</style>

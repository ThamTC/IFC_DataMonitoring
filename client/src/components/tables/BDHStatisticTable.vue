<template>
<statistic-table :statisticData="statisticData"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import StatisticTable from './StatisticTable.vue'
export default {
    name: "BDHStatisticTable",
    components: {
        StatisticTable
    },
    data() {
        return {
            statisticData: {
                isError: false,
                error: null,
                isLoading: true,
                routeName: "",
                dataItems: [],
            }
        }
    },
    computed: {
        ...mapGetters(["getDataStatistic"]),
        getDataItems() {
            return this.statisticData.dataItems = this.getDataStatistic
        }
    },
    watch: {
        getDataItems() {},
    },
    created() {
        document.title = "BDH Statistic"
        const routeName = this.$route.name
        this.statisticData.routeName = routeName
        this.getStatisticStore(routeName).then((data) => {
                this.statisticData.dataItems = data
                this.statisticData.isLoading = false
            }).catch((err) => {
                this.statisticData.isLoading = false
                this.statisticData.isError = true
                this.statisticData.error = err.message
            })
    },
    methods: {
        ...mapActions(["getStatisticStore"]),
    },
}
</script>

<style>

</style>

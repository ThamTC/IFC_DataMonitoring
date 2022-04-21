<template>
<div id="layoutSidenav_content">
    <RealTime v-if="canShowRealTime && loadTable === 'realtime'" name="realtime"></RealTime>
    <Statistic v-if="canShowStatistic && loadTable === 'statistic'" name="statistic"></Statistic>
    <Test v-if="canShowTest && loadTable === 'test'" name="test"></Test>
    <Footer></Footer>
</div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../stores/store'
import Footer from '../Footer.vue'
import RealTime from '../tables/RealTime.vue'
import Statistic from '../tables/Statistic.vue'
import Test from '../tables/Test.vue'
import checkPermission from '../../untils/checkPermission'

export default {
    name: "SideNavContent",
    components: {
        Footer,
        RealTime,
        Statistic,
        Test
    },
    computed: {
        loadTable() {
            return store.getters.getLoadTable
        },
        canShowRealTime() {
            return checkPermission(store.getters.getUser, ["view-realtime"])
        },
        canShowStatistic() {
            return checkPermission(store.getters.getUser, ["view-statistic"])
        },
        canShowTest() {
            return checkPermission(store.getters.getUser, ["view-test"])
        }
    }
}
</script>

<style>

</style>

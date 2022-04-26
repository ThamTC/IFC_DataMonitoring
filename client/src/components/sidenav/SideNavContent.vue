<template>
<div id="layoutSidenav_content">
    <RealTime v-if="canShowRealTime && loadTable === 'realtime'" name="realtime"></RealTime>
    <Statistic v-if="canShowStatistic && loadTable === 'statistic'" name="statistic"></Statistic>
    <TestRealtime v-if="canShowTest && loadTable === 'test_realtime'" name="test_realtime"></TestRealtime>
    <TestStatistic v-if="canShowTest && loadTable === 'test_statistic'" name="test_statistic"></TestStatistic>
    <ManagerUsers v-if="canShowManager && loadTable === 'manager'" name="manager"></ManagerUsers>
    <Footer></Footer>
</div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../stores/store'
import Footer from '../Footer.vue'
import RealTime from '../tables/RealTime.vue'
import Statistic from '../tables/Statistic.vue'
import TestRealtime from '../tables/Test_Realtime.vue'
import TestStatistic from '../tables/Test_Statistic.vue'
import ManagerUsers from '../tables/ManagerUser.vue'
import checkPermission from '../../untils/checkPermission'

export default {
    name: "SideNavContent",
    components: {
        Footer,
        RealTime,
        Statistic,
        TestRealtime,
        TestStatistic,
        ManagerUsers
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
        },
        canShowManager() {
            return checkPermission(store.getters.getUser, ["view-manager"])
        }
    }
}
</script>

<style>

</style>

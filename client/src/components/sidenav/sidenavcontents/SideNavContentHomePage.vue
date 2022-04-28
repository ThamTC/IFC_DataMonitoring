<template>
<div id="layoutSidenav_content">
        <RealTime v-if="canShowRealTime && loadTable === 'realtime'" name="realtime"></RealTime>
        <Statistic v-if="canShowStatistic && loadTable === 'statistic'" name="statistic"></Statistic>
        <ManagerUsers v-if="canShowManager && loadTable === 'manager'" name="manager"></ManagerUsers>
        <Footer></Footer>
</div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../../stores/store'
import Footer from '../../Footer.vue'
import RealTime from '../../tables/Realtime.vue'
import Statistic from '../../tables/Statistic.vue'
import ManagerUsers from '../../tables/ManagerUser.vue'
import checkPermission from '../../../untils/checkPermission'

export default {
    name: "SideNavContentHomePage",
    components: {
        Footer,
        RealTime,
        Statistic,
        ManagerUsers
    },
    computed: {
        canShow() {
            return store.getters.getSideNavContent
        },
        loadTable() {
            return store.getters.getLoadTable
        },
        canShowRealTime() {
            return checkPermission(store.getters.getUser, ["view-realtime"])
        },
        canShowStatistic() {
            return checkPermission(store.getters.getUser, ["view-statistic"])
        },
        canShowManager() {
            return checkPermission(store.getters.getUser, ["view-manager"])
        }
    }
}
</script>

<style>

</style>

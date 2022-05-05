<template>
<div id="layoutSidenav_content">
        <RealTime v-if="canShowRealTime && loadTable === 'realtime'" name="realtime"></RealTime>
        <Statistic v-if="canShowStatistic && loadTable === 'statistic'" name="statistic"></Statistic>
        <ManagerUsers v-if="canShowManagerUser && loadTable === 'managerUser'" name="managerUser"></ManagerUsers>
        <ManagerRoles v-if="canShowManagerRole && loadTable === 'managerRole'" name="managerRole"></ManagerRoles>
        <Footer></Footer>
</div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../../stores/store'
import Footer from '../../Footer.vue'
import RealTime from '../../tables/RealTimeTable.vue'
import Statistic from '../../tables/StatisticTable.vue'
import ManagerUsers from '../../tables/ManagerUser.vue'
import ManagerRoles from '../../tables/ManagerRole.vue'
import checkPermission from '../../../untils/checkPermission'

export default {
    name: "SideNavContentHomePage",
    components: {
        Footer,
        RealTime,
        Statistic,
        ManagerUsers,
        ManagerRoles
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
        canShowManagerUser() {
            return checkPermission(store.getters.getUser, ["view-managerUser"])
        },
        canShowManagerRole() {
            return checkPermission(store.getters.getUser, ["view-managerRole"])
        }
    }
}
</script>

<style>

</style>

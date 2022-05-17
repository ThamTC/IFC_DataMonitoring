<template>
<div id="layoutSidenav_content">
        <RealTime v-if="loadTable === 'realtime'" name="realtime"></RealTime>
        <Statistic v-if="loadTable === 'statistic'" name="statistic"></Statistic>
        <ManagerUsers v-if="loadTable === 'managerUser'" name="managerUser"></ManagerUsers>
        <ManagerRoles v-if="loadTable === 'managerRole'" name="managerRole"></ManagerRoles>
        <Footer></Footer>
</div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import { mapGetters } from 'vuex'
import Footer from '../../Footer.vue'
import RealTime from '../../tables/RealTimeTable.vue'
import Statistic from '../../tables/StatisticTable.vue'
import ManagerUsers from '../../tables/ManagerUser.vue'
import ManagerRoles from '../../tables/ManagerRole.vue'

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
        ...mapGetters({loadTable: "getLoadTable"}),        
    }
}
</script>

<style>

</style>

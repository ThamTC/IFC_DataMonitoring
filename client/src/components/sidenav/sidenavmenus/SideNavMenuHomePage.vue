<template>
<div>
    <side-nav-home v-if="canShowHome"/>
    <side-nav-manager v-if="canShowManager"/>
    <side-nav-solar v-if="canShowSolar"/>
    <side-nav-chart v-if="canShowChart"/>
    <side-nav-redmine v-if="canShowRedmine"/>
    <side-nav-bmb v-if="canShowBmb"/>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import checkRole from '../../../untils/checkRole'
import ConstString from '../../../untils/constString';
import SideNavBmb from './subSideNavMenus/sideNavBmb.vue';
import SideNavChart from './subSideNavMenus/sideNavChart.vue';
import SideNavHome from './subSideNavMenus/sideNavHome.vue';
import SideNavManager from './subSideNavMenus/sideNavManager.vue';
import SideNavRedmine from './subSideNavMenus/sideNavRedmine.vue';
import SideNavSolar from './subSideNavMenus/sideNavSolar.vue';

export default {
    name: "SideNavMeneHomePage",
    components: { SideNavHome, SideNavManager, SideNavSolar, SideNavChart, SideNavRedmine, SideNavBmb},
    computed: {
        ...mapGetters(["getUser", "getLoadTable"]),
        canShowHome() {
            return checkRole(this.getUser, ["realtime", "statistic"], ConstString.READ)
        },
        canShowManager() {
            return checkRole(this.getUser, ["managerRole", "managerUser", "managerPermission"], ConstString.READ)
        },
        canShowSolar() {
            return checkRole(this.getUser, ["solar_realtime", "solar_statistic"], ConstString.READ)
        },
        canShowChart() {
            return checkRole(this.getUser, ["asdsd"], ConstString.READ)
        },
        canShowRedmine() {
            return checkRole(this.getUser, ["issues"], ConstString.READ)
        },
        canShowBmb() {
            return checkRole(this.getUser, ["bmb_realtime"], ConstString.READ)
        },
    }
};
</script>

<style>
.highlight {
    color: white !important;
}
</style>

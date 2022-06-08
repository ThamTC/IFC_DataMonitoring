<template>
<div>
    <side-nav-home v-if="canShowHome"/>
    <side-nav-manager v-if="canShowManager"/>
    <side-nav-solar v-if="canShowSolar"/>
    <side-nav-chart v-if="canShowChart"/>
    <side-nav-redmine />
    <side-nav-bmb v-if="canShowBMB"/>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import checkRole from '../../../untils/checkRole'
import SideNavBMB from './subSideNavMenus/sideNavBMB.vue';
import SideNavChart from './subSideNavMenus/sideNavChart.vue';
import sideNavHome from './subSideNavMenus/sideNavHome.vue';
import SideNavManager from './subSideNavMenus/sideNavManager.vue';
import SideNavRedmine from './subSideNavMenus/sideNavRedmine.vue';
import SideNavSolar from './subSideNavMenus/sideNavSolar.vue';

export default {
    name: "SideNavMeneHomePage",
    components: { sideNavHome, SideNavManager, SideNavSolar, SideNavChart, SideNavRedmine, SideNavBMB },
    computed: {
        ...mapGetters(["getUser", "getLoadTable"]),
        canShowHome() {
            return checkRole(this.getUser, ["realtime", "statistic"])
        },
        canShowManager() {
            return checkRole(this.getUser, ["managerRole", "managerUser", "managerPermission"])
        },
        canShowSolar() {
            return checkRole(this.getUser, ["solar_realtime", "solar_statistic"])
        },
        canShowChart() {
            return checkRole(this.getUser, ["asdsd"])
        },
        canShowBMB() {
            return checkRole(this.getUser, ["bmb_realtime"])
        }
    }
};
</script>

<style>
.highlight {
    color: white !important;
}
</style>

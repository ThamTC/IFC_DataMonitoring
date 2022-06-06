<template>
<div>
    <side-nav-home v-if="canShowHome"/>
    <side-nav-manager v-if="canShowManager"/>
    <side-nav-solar v-if="canShowSolar"/>
    <side-nav-chart v-if="canShowChart"/>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import checkRole from '../../../untils/checkRole'
import SideNavChart from './subSideNavMenus/sideNavChart.vue';
import sideNavHome from './subSideNavMenus/sideNavHome.vue';
import SideNavManager from './subSideNavMenus/sideNavManager.vue';
import SideNavSolar from './subSideNavMenus/sideNavSolar.vue';

export default {
    name: "SideNavMeneHomePage",
    components: { sideNavHome, SideNavManager, SideNavSolar, SideNavChart },
    computed: {
        ...mapGetters(["getUser", "getLoadTable"]),
        canShowHome() {
            return checkRole(this.getUser, ["admin", "manager"])
        },
        canShowManager() {
            return checkRole(this.getUser, ["manager"])
        },
        canShowSolar() {
            return checkRole(this.getUser, ["manager", "solar"])
        },
        canShowChart() {
            return checkRole(this.getUser, ["manager", "admin"])
        }
    }
};
</script>

<style>
.highlight {
    color: white !important;
}
</style>

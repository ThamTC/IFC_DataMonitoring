<template>
<div class="sb-sidenav-menu">
    <div class="nav">
        <SideNavMenuHomePage v-if="canShow == 'homepage'"></SideNavMenuHomePage>
        <SideNavMenuAccount v-else-if="canShow == 'account'"></SideNavMenuAccount>
    </div>
</div>
</template>

<script>
import SideNavMenuHomePage from './sidenavmenus/SideNavMenuHomePage.vue'
import SideNavMenuAccount from './sidenavmenus/SideNavMenuAccount.vue'
import { mapGetters } from "vuex";
export default {
    name: "SideNavMenu",
    components: {
        SideNavMenuHomePage,
        SideNavMenuAccount
    },
    computed: {
        ...mapGetters(["getSideNavMenu"]),
        canShow() {
            return this.getSideNavMenu
        }
    }
};
</script>

<style>
</style>

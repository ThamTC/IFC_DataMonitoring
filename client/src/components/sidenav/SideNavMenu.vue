<template>
<div class="sb-sidenav-menu">
        <SideNavMenuHomePage v-if="canShow == 'home'"></SideNavMenuHomePage>
        <SideNavMenuAccount v-else-if="canShow == 'account'"></SideNavMenuAccount>
</div>
</template>

<script>
import SideNavMenuHomePage from './sidenavmenucontents/SideNavMenuHomePage.vue'
import SideNavMenuAccount from './sidenavmenucontents/SideNavMenuAccount.vue'
import { mapGetters } from 'vuex'
export default {
    name: "SideNavMenu",
    components: {
        SideNavMenuHomePage,
        SideNavMenuAccount
    },
    computed: {
        ...mapGetters(["getSideNavContent"]),
        canShow() {
            return this.getSideNavContent
        }
    }
};
</script>

<style>
</style>

<template>
<div class="sb-sidenav-menu">
        <SideNavMenuHomePage v-if="canShow == 'home'"></SideNavMenuHomePage>
        <SideNavMenuAccount v-else-if="canShow == 'account'"></SideNavMenuAccount>
</div>
</template>

<script>
import SideNavMenuHomePage from './sidenavmenucontents/SideNavMenuHomePage.vue'
import SideNavMenuAccount from './sidenavmenucontents/SideNavMenuAccount.vue'
import store from '../../stores/store'
export default {
    name: "SideNavMenu",
    components: {
        SideNavMenuHomePage,
        SideNavMenuAccount
    },
    computed: {
        canShow() {
            return store.getters.getSideNavContent
        }
    }
};
</script>

<style>
</style>

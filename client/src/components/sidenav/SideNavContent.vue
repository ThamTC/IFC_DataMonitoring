<template>
<SideNavContentHomePage v-if="canShow == 'home'"></SideNavContentHomePage>
<SideNavContentAccount v-else-if="canShow == 'account'"></SideNavContentAccount>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../stores/store'
import SideNavContentHomePage from './sidenavcontents/SideNavContentHomePage.vue'
import SideNavContentAccount from './sidenavcontents/SideNavContentAccount.vue'

export default {
    name: "SideNavContent",
    components: {
        SideNavContentHomePage,
        SideNavContentAccount
    },
    computed: {
        canShow() {
            return store.getters.getSideNavContent
        }
    }
}
</script>

<style>

</style>

<template>
<SideNavContentHomePage v-if="canShow == 'home'"></SideNavContentHomePage>
<SideNavContentAccount v-else-if="canShow == 'account'"></SideNavContentAccount>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import { mapGetters } from 'vuex'
import SideNavContentHomePage from './sidenavcontents/SideNavContentHomePage.vue'
import SideNavContentAccount from './sidenavcontents/SideNavContentAccount.vue'

export default {
    name: "SideNavContent",
    components: {
        SideNavContentHomePage,
        SideNavContentAccount
    },
    computed: {
        ...mapGetters(["getSideNavContent"]),
        canShow() {
            return this.getSideNavContent
        }
    }
}
</script>

<style>

</style>

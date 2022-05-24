<template>
<div>
    <SideNav />
</div>
</template>

<script>
import SideNav from './SideNav.vue'
import { mapMutations } from 'vuex'
import jwtDecode from 'jwt-decode'

export default {
    name: "AccountSetting",
    components: {
        SideNav
    },
    created() {
        document.title = "Account Setting"
    },
    methods: {
        ...mapMutations(["setUser", "setIsLoggin","setSideNavMenu"])
    },
    mounted() {
        const accessToken = localStorage.getItem("accessToken")
        const user = jwtDecode(accessToken)
        this.setUser(user);
        this.setIsLoggin(true);
        this.setSideNavMenu("account")
    },
    
}
</script>

<style>

</style>

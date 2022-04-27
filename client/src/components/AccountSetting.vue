<template>
<div>
    <NavBar></NavBar>
    <SideNav />
</div>
</template>

<script>
import NavBar from "./NavBar.vue";
import SideNav from './SideNav.vue'

export default {
    name: "AccountSetting",
    components: {
        NavBar,
        SideNav
    },
    created() {
        document.title = "Account Setting"
    },
    
}
</script>

<style>

</style>

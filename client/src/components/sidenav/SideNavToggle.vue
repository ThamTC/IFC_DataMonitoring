<template>
<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <SideNavMenu />
    <SideNavFooter />
</nav>
</template>

<script>
import SideNavMenu from './SideNavMenu.vue'
import SideNavFooter from './SideNavFooter.vue'
export default {
    name: 'SideNavToogle',
    components: {
        SideNavMenu,
        SideNavFooter
    }
}
</script>

<style>

</style>

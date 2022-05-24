<template>
<div id="layoutSidenav_content">
    <router-view></router-view>
    <Footer></Footer>
</div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import Footer from '../Footer.vue'

export default {
    name: "SideNavContent",
    components: {
        Footer
    },
}
</script>

<style>

</style>

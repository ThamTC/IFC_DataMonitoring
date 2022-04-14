<template>
<div>
    <NavBar></NavBar>
    <SideNav />
</div>
</template>

<script type="module">
import NavBar from "./NavBar.vue";
import SideNav from './SideNav.vue'
import Cookies from 'js-cookie'
export default {
    name: "HomePage",
    data() {
        return {
            tableName: ""
        }
    },
    components: {
        NavBar,
        SideNav
    },
    mounted() {
        console.log(JSON.parse(this.$cookies.get("refreshToken")))
    },

};
</script>

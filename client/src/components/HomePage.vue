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
    name: "HomePage",
    data() {
        return {
            tableName: ""
        }
    },
    created() {
        document.title = 'Trang chủ'
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

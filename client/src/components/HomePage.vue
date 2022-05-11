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
        const username = JSON.parse(localStorage.getItem("user")).username
        this.$socket.emit("login", {username: username})
    },

};
</script>

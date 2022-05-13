<template>
<div>
    <NavBar></NavBar>
    <SideNav />
    <div id="myToast"></div>
</div>
</template>

<script>
import NavBar from "./NavBar.vue";
import SideNav from './SideNav.vue'
import jwtDecode from 'jwt-decode'
import myToast from '../untils/myToast'

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
        const accessToken = localStorage.getItem("accessToken")
        const user = jwtDecode(accessToken)
        this.$socket.emit("login", {
            username: user.username
        })
    },

};
</script>

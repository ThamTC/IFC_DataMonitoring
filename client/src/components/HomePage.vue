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
import { mapMutations } from 'vuex';

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
    created() {
        document.title = 'Trang chủ'
    },
    methods: {
        ...mapMutations(["setUser", "setIsLoggin", "setLoadTable", "setSideNavContent"]),
    },
    mounted() {
        const accessToken = localStorage.getItem("accessToken")
        const user = jwtDecode(accessToken)
        const loadTableName = user.permissions[0].split('-')[1]
        this.setUser(user);
        this.setIsLoggin(true);
        this.setLoadTable(loadTableName)
        this.$socket.emit("login", {
            username: user.username
        })
    },

};
</script>

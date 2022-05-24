<template>
<div>
    <SideNav />
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
        ...mapMutations(["setUser", "setIsLoggin", "setLoadTable", "setSideNavMenu"]),
    },
    mounted() {
        const accessToken = localStorage.getItem("accessToken")
        const user = jwtDecode(accessToken)
        this.setUser(user);
        this.setIsLoggin(true);
        // this.setLoadTable(loadTableName)
        this.setSideNavMenu("homepage")
        this.$socket.emit("login", {
            username: user.username
        })
    },

};
</script>

<template>
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <router-link class="navbar-brand ps-3" to="/">IFC</router-link>
    <!-- Sidebar Toggle-->
    <button v-if="isLoggin" class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" @click="sidebarToggle">
        <i class="fas fa-bars"></i>
    </button>
    <!-- Navbar Search-->
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div v-if="isLoggin" class="input-group">
            <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button class="btn btn-primary" id="btnNavbarSearch" type="button">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </form>
    <NotiIcon v-if="canShow"></NotiIcon>
    <OnlineIcon v-if="isLoggin"></OnlineIcon>

    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 navbar-expand">

        <router-link v-if="!isLoggin" class="nav-link ps-4" to="/login"> Login </router-link>
        <router-link v-if="!isLoggin" class="nav-link ps-4" to="/register"> Register </router-link>

        <div class="noti-icon px-3">

            <li class="nav-item dropdown">
                <router-link class="nav-link px-1" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" style="width: 30px;" alt="Avatar" />
                </router-link>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><router-link class="dropdown-item" to="/account">Settings</router-link></li>
                    <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                    <li v-show="isLoggin">
                        <hr class="dropdown-divider" />
                    </li>
                    <li v-show="isLoggin"><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
                </ul>
            </li>
        </div>
    </ul>
</nav>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import authRequest from '../apis/authRequest'
import NotiIcon from './icons/Notification.vue'
import OnlineIcon from './icons/OnlineIcon.vue'
export default {

    name: "NavBar",
    components: {
        NotiIcon,
        OnlineIcon
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters(["checkLoggin", "getUser"]),
        canShow() {
            return this.checkLoggin && this.getUser.role === "manager"
        },
        isLoggin() {
            return this.checkLoggin
        }
    },
    methods: {
        ...mapMutations(["setUser", "setIsLoggin"]),
        ...mapActions(["signout"]),
        logout() {
            this.signout().then((data) => {
                this.setUser({});
                this.setIsLoggin(false);
                this.$router.push({
                    name: "dashboard"
                })
            }).catch((error) => {
                console.log(error)
            })
        },
        sidebarToggle() {
            document.body.classList.toggle('sb-sidenav-toggled')
        }
    },
};
</script>

<style>
.navbar-expand {
    align-items: center;
}
</style>

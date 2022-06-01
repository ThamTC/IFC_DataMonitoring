<template>
<div>
    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseAccount" aria-expanded="false" aria-controls="collapseAccount">
        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
        Account
        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
    </a>
    <div class="collapse" id="collapseAccount" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        <nav class="sb-sidenav-menu-nested nav">
            <router-link tag="a" class="nav-link" :to="{name: 'general'}" active-class="active" exact>General</router-link>
            <router-link tag="a" class="nav-link" :to="{name: 'change_password'}" active-class="active">Change password</router-link>
            <router-link v-if="getUser.role !== 'manager'" tag="a" class="nav-link" :to="{name: 'request_role'}" active-class="active">Request Role</router-link>
            <!-- <a class="nav-link" href="#">Social links</a>
            <a class="nav-link" href="#">Connections</a>
            <a class="nav-link" href="#">Notifications</a> -->
        </nav>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Account",
    computed: {
        ...mapGetters(["getUser"]),
    },
    methods: {
        
    },
}
</script>

<style>

</style>

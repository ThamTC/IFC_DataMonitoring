<template>
<div>
    <div v-if="canShowData">
        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseData" aria-expanded="false" aria-controls="collapseData">
            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
            Data
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseData" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
                <router-link tag="a" class="nav-link" to="/realtime" active-class="active">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-chart-area"></i>
                    </div>
                    Realtime
                </router-link>
                <router-link tag="a" class="nav-link" to="/statistic" active-class="active">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-table"></i>
                    </div>
                    Statistic
                </router-link>

            </nav>
        </div>
    </div>
    <div v-if="canShowManager">

        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseManager" aria-expanded="false" aria-controls="collapseManager">
            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
            Manager
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseManager" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
                <router-link tag="a" class="nav-link" to="/managerUser" active-class="active">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-users-cog"></i>
                    </div>
                    Manager Users
                </router-link>

                <router-link tag="a" class="nav-link" to="/managerRole" active-class="active">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-user-tag"></i>
                    </div>
                    Manager Roles
                </router-link>
            </nav>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import checkPermission from '../../../untils/checkPermission'
import checkRole from '../../../untils/checkRole'

export default {
    name: "SideNavMeneHomePage",
    computed: {
        ...mapGetters(["getUser", "getLoadTable"]),
        canShowData() {
            return checkRole(this.getUser, ["admin", "manager"])
        },
        canShowManager() {
            return checkRole(this.getUser, ["manager"])
        }
    },
    methods: {
        ...mapActions(["handleSetLoadTable"]),
        // setLoadTable(name) {
        //     this.handleSetLoadTable(name);
        //     Object.keys(this.$refs).forEach(el => {
        //         if (name !== el) {
        //             this.$refs[el].classList.remove("highlight")
        //             this.$refs[name].classList.add("highlight")
        //         }
        //     })
        // },
    },
    mounted() {
        this.$forceUpdate(() => {

        });
    },
    // updated() {

    //     let tableName = this.getLoadTable
    //     if (this.$refs[tableName]) {
    //         this.$refs[tableName].classList.add("highlight")
    //     }
    // },
};
</script>

<style>
.highlight {
    color: white !important;
}
</style>

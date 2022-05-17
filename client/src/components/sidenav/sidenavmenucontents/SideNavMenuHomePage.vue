<template>
<div class="nav">
    <a v-if="canShowRealTime" ref="realtime" class="nav-link" @click="setLoadTable('realtime')">
        <div class="sb-nav-link-icon">
            <i class="fas fa-chart-area"></i>
        </div>
        Trực tuyến
    </a>
    <a v-if="canShowStatistic" ref="statistic" class="nav-link" @click="setLoadTable('statistic')">
        <div class="sb-nav-link-icon">
            <i class="fas fa-table"></i>
        </div>
        Thống kê
    </a>
    <a v-if="canShowManagerUser" ref="managerUser" class="nav-link" @click="setLoadTable('managerUser')">
        <div class="sb-nav-link-icon">
            <i class="fas fa-users-cog"></i>
        </div>
        Manager Users
    </a>

    <a v-if="canShowManagerRole" ref="managerRole" class="nav-link" @click="setLoadTable('managerRole')">
        <div class="sb-nav-link-icon">
            <i class="fas fa-user-tag"></i>
        </div>
        Manager Roles
    </a>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import checkPermission from '../../../untils/checkPermission'

export default {
    name: "SideNavMeneHomePage",
    computed: {
        ...mapGetters(["getUser", "getLoadTable"]),
        canShowRealTime() {
            return checkPermission(this.getUser, ["view-realtime"])
        },
        canShowStatistic() {
            return checkPermission(this.getUser, ["view-statistic"])
        },
        canShowManagerUser() {
            return checkPermission(this.getUser, ["view-managerUser"])
        },
        canShowManagerRole() {
            return checkPermission(this.getUser, ["view-managerRole"])
        }
    },
    methods: {
        ...mapActions(["handleSetLoadTable"]),
        setLoadTable(name) {
            this.handleSetLoadTable(name);
            Object.keys(this.$refs).forEach(el => {
                if (name !== el) {
                    this.$refs[el].classList.remove("highlight")
                    this.$refs[name].classList.add("highlight")
                }
            })
        },
    },
    mounted() {
        this.$forceUpdate(() => {
            
            });
    },
    updated() {
        
        let tableName = this.getLoadTable
        if (this.$refs[tableName]) {
            this.$refs[tableName].classList.add("highlight")
        }
    },
};
</script>

<style>
.highlight {
    color: white !important;
}
</style>

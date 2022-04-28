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
    <a v-if="canShowManager" ref="manager" class="nav-link" @click="setLoadTable('manager')">
        <div class="sb-nav-link-icon">
            <i class="fas fa-users-cog"></i>
        </div>
        Manager Users
    </a>
</div>
</template>

<script>
import store from '../../../stores/store'
import checkPermission from '../../../untils/checkPermission'

export default {
    name: "SideNavMeneHomePage",
    computed: {
        canShowRealTime() {
            return checkPermission(store.getters.getUser, ["view-realtime"])
        },
        canShowStatistic() {
            return checkPermission(store.getters.getUser, ["view-statistic"])
        },
        canShowManager() {
            return checkPermission(store.getters.getUser, ["view-manager"])
        }
    },
    methods: {
        setLoadTable(name) {
            store.dispatch("handleSetLoadTable", name);
            Object.keys(this.$refs).forEach(el => {
                if (name !== el) {
                    this.$refs[el].classList.remove("highlight")
                    this.$refs[name].classList.add("highlight")
                }
            })
        },
    },
    mounted() {
        let tableName = store.getters.getLoadTable
        this.$refs[tableName].classList.add("highlight")
    },
};
</script>

<style>
.highlight {
    color: white !important;
}
</style>

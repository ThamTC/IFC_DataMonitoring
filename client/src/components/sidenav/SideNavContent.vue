<template>
    <div id="layoutSidenav_content">
        <RealTime v-if="loadTable === 'realtime'"></RealTime>
        <Statistic v-if="loadTable === 'statistic'"></Statistic>
        <Footer></Footer>
    </div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../stores/store'
import Footer from '../Footer.vue'
import RealTime from '../tables/RealTime.vue'
import Statistic from '../tables/Statistic.vue'

export default {
    name: "SideNavContent",
    components: {
        Footer,
        RealTime,
        Statistic
    },
    computed: {
        loadTable(){
            return store.getters.getLoadTable
        }
    }
}
</script>

<style>

</style>
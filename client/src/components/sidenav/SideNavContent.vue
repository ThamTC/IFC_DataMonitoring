<template>
    <div id="layoutSidenav_content">
        <RealTime v-if="loadTable === 'realtime'"></RealTime>
        <Statistic v-if="loadTable === 'statistic'"></Statistic>
        <Test v-if="loadTable === 'test'"></Test>
        <Footer></Footer>
    </div>
</template>

<script>
// import BreadCrumbs from './BreadCrumbs.vue'
import store from '../../stores/store'
import Footer from '../Footer.vue'
import RealTime from '../tables/RealTime.vue'
import Statistic from '../tables/Statistic.vue'
import Test from '../tables/Test.vue'

export default {
    name: "SideNavContent",
    components: {
        Footer,
        RealTime,
        Statistic,
        Test
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
import RealTime from '../components/tables/RealTime.vue'
import Statistic from '../components/tables/Statistic.vue'
import Test from '../components/tables/Test.vue'

export default [
    {
        path: "/realtime",
        nmae: "realtime",
        component: RealTime
    },
    {
        path: "/statistic",
        nmae: "statistic",
        component: Statistic
    },
    {
        path: "/test",
        nmae: "test",
        component: Test
    }
]
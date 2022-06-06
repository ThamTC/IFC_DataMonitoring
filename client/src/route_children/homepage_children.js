import RealTime from '../components/tables/RealTimeTable.vue'
import Statistic from '../components/tables/StatisticTable.vue'
import ManagerUser from '../components/tables/ManagerUser.vue'
import SolarRealTimeTable from '../components/tables/SolarRealTimeTable.vue'
import SolarStatisticTable from '../components/tables/SolarStatisticTable.vue'
import Default from '../components/Default.vue'
import ManagerPermission from '../components/tables/ManagerPermission.vue'

export default [
    {
        path: "default",
        name: "default",
        component: Default
    },
    {
        path: "realtime",
        name: "realtime",
        component: RealTime
    },
    {
        path: "statistic",
        name: "statistic",
        component: Statistic
    },
    {
        path: "managerUser",
        name: "managerUser",
        component: ManagerUser
    },
    {
        path: "managerPermission",
        name: "managerPermission",
        component: ManagerPermission
    },
    {
        path: "solar/realtime",
        name: "solar_realtime",
        component: SolarRealTimeTable
    },
    {
        path: "solar/statistic",
        name: "solar_statistic",
        component: SolarStatisticTable
    }
]
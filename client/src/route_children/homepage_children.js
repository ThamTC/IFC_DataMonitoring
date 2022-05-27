import RealTime from '../components/tables/RealTimeTable.vue'
import Statistic from '../components/tables/StatisticTable.vue'
import ManagerUser from '../components/tables/ManagerUser.vue'
import ManagerRole from '../components/tables/ManagerRole.vue'
import SolarRealTimeTable from '../components/tables/SolarRealTimeTable.vue'
import SolarStatisticTable from '../components/tables/SolarStatisticTable.vue'

export default [
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
        path: "managerRole",
        name: "managerRole",
        component: ManagerRole
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
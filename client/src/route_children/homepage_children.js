import RealTime from '../components/tables/RealTimeTable.vue'
import Statistic from '../components/tables/StatisticTable.vue'
import ManagerUser from '../components/tables/ManagerUser.vue'
import ManagerRole from '../components/tables/ManagerRole.vue'

export default [
    {
        path: "realtime",
        name: "realtime_table",
        component: RealTime
    },
    {
        path: "statistic",
        name: "statistic_table",
        component: Statistic
    },
    {
        path: "managerUser",
        name: "managerUser_table",
        component: ManagerUser
    },
    {
        path: "managerRole",
        name: "managerRole_table",
        component: ManagerRole
    },
    {
        path: "solar/realtime",
        name: "solar_realtime",
        component: RealTime
    },
    {
        path: "solar/statistic",
        name: "solar_statistic",
        component: Statistic
    }
]
import BDHRealTime from '../components/tables/BDHRealTimeTable.vue'
import BDHStatistic from '../components/tables/BDHStatisticTable.vue'
import ManagerUser from '../components/tables/ManagerUser.vue'
import SolarRealTimeTable from '../components/tables/SolarRealTimeTable.vue'
import SolarStatisticTable from '../components/tables/SolarStatisticTable.vue'
import Default from '../components/Default.vue'
import ManagerPermission from '../components/tables/ManagerPermission.vue'
import ManagerRole from '../components/tables/ManagerRoles.vue'
import IssueDetail from '../components/redmine/IssueDetail.vue'
import Issue from '../components/redmine/Issue.vue'
import Redmine from '../components/redmine/Redmine.vue'
import BMBRealTime from '../components/tables/BMBRealTimeTable.vue'

export default [
    {
        path: "default",
        name: "default",
        component: Default
    },
    {
        path: "realtime",
        name: "realtime",
        component: BDHRealTime
    },
    {
        path: "statistic",
        name: "statistic",
        component: BDHStatistic
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
    },
    {
        path: "redmine/issues",
        name: "redmine_issues",
        component: Redmine,
        children: [
            {
                path: "",
                name: "issue",
                component: Issue
            },
            {
                path: ":id",
                name: "issue_detail",
                component: IssueDetail
            }
        ]
    },
    {
        path: "bmb_room/realtime",
        name: "bmb_realtime",
        component: BMBRealTime
    }
]
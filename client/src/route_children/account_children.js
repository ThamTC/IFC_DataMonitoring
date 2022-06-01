import General from '../components/accountsetting/General.vue'
import ChangePassword from '../components/accountsetting/ChangePassword.vue'
import RequestRole from '../components/accountsetting/RequestRole.vue'

export default [
    {
        path: "general",
        name: "general",
        component: General
    },
    {
        path: "change_password",
        name: "change_password",
        component: ChangePassword
    },
    {
        path: "request_role",
        name: "request_role",
        component: RequestRole
    },
]
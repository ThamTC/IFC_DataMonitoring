import General from '../components/accountsetting/General.vue'
import ChangePassword from '../components/accountsetting/ChangePassword.vue'
import Info from '../components/accountsetting/Info.vue'

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
        path: "info",
        name: "info",
        component: Info
    },
]
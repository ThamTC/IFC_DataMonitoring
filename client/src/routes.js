import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import Err404 from './components/errors/Err404.vue'
import DashBoard from './components/DashBoard.vue'
import { authUser } from './middlewares/authBasic'
import authRouter from './routers/authRouter'
import AccountSetting from './components/AccountSetting.vue'

const routers = [
    {
        path: '/',
        name: "home",
        component: HomePage,
        beforeEnter: authUser,
    },
    {
        path: '/dashboard',
        name: "dashboard",
        component: DashBoard,
    },
    ...authRouter,
    {
        path: "/account",
        name: "account",
        component: AccountSetting,
        beforeEnter: authUser
    },
    {
        path: '/:pathMatch(.*)*',
        component: Err404
    }
]

const router = createRouter({
    routes: routers,
    history: createWebHistory()
})

export default router
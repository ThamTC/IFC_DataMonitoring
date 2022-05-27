import { createRouter, createWebHistory, useRoute } from 'vue-router'
import HomePage from './components/HomePage.vue'
import Err404 from './components/errors/Err404.vue'
import DashBoard from './components/DashBoard.vue'
import { authUser } from './middlewares/authBasic'
import authRouter from './routers/authRouter'
import AccountSetting from './components/AccountSetting.vue'
import NavBar from './components/NavBar.vue'
import homepage_children from './route_children/homepage_children'
import account_children from './route_children/account_children'
import store from './store'

const routers = [
    {
        path: '/',
        name: "home",
        components: {default: HomePage, "navbar": NavBar},
        beforeEnter: authUser,
        redirect: to => {return {name: to.query.routeDefault}},
        children: homepage_children
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
        beforeEnter: authUser,
        components: {default: AccountSetting, "navbar": NavBar},
        redirect: {name: "general"},
        children: account_children
    },
    {
        path: '/:pathMatch(.*)*',
        component: Err404
    }
]

const router = createRouter({
    routes: routers,
    history: createWebHistory(),
    linkExactActiveClass: "active",
})

export default router
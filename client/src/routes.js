import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import Password from './components/auth/Password.vue'
import Err404 from './components/errors/Err404.vue'
import DashBoard from './components/DashBoard.vue'
import store from './stores/store'
import jwt_decode from 'jwt-decode'
import apiRequest from './apiRequest'

const routers = [
    {
        path: '/',
        name: "",
        component: HomePage,
        beforeEnter: async(to, from, next) => {
            let refreshToken = await apiRequest.refreshToken()
            if(refreshToken?.status){
                next({name: "login"})
            }
            let decoded = jwt_decode(refreshToken)
            store.state.user.username = decoded.username
            next()
        }
    },
    {
        path: '/home',
        name: "home",
        component: HomePage,
        beforeEnter: async(to, from, next) => {
            let refreshToken = await apiRequest.refreshToken()
            if(refreshToken?.status){
                next({name: "login"})
            }
            let decoded = jwt_decode(refreshToken)
            store.state.user.username = decoded.username
            next()
        }
    },
    {
        path: '/dashboard',
        name: "dashboard",
        component: DashBoard
    },
    {
        path: '/login',
        name: "login",
        component: Login
    },
    {
        path: '/password',
        name: "password",
        component: Password
    },
    {
        path: '/register',
        name: "register",
        component: Register
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
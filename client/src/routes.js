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
import {authUser, isLogged} from './middlewares/authBasic'

const routers = [
    {
        path: '/',
        name: "",
        component: HomePage,
        beforeEnter: authUser
    },
    {
        path: '/home',
        name: "home",
        component: HomePage,
        beforeEnter: authUser
    },
    {
        path: '/dashboard',
        name: "dashboard",
        component: DashBoard
    },
    {
        path: '/login',
        name: "login",
        component: Login,
        beforeEnter: isLogged
    },
    {
        path: '/password',
        name: "password",
        component: Password,
        beforeEnter: isLogged
    },
    {
        path: '/register',
        name: "register",
        component: Register,
        beforeEnter: isLogged
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